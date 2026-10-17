#!/usr/bin/env node
/*
 * Runs in GitHub Actions (.github/workflows/qwen-merge-undo.yml), triggered
 * on every new issue comment. Purely mechanical git/gh operations -- no AI,
 * no call to Qwen or any model. This is deliberate: the whole point of
 * #MERGE and #UNDO is that an admin can trust them even if the AI-driven
 * side of this system (automation/qwen-bot/poll.mjs, which only runs on the
 * admin's laptop) is broken, offline, or behaving badly.
 *
 * Looks at exactly one comment (the one that triggered this run) and does
 * nothing unless it's from an admin (automation/admins.txt) and contains
 * #MERGE or #UNDO as a standalone word.
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const REPO = process.env.GITHUB_REPOSITORY;
const ISSUE_NUMBER = process.env.ISSUE_NUMBER;
const COMMENT_AUTHOR = (process.env.COMMENT_AUTHOR || "").toLowerCase();
const COMMENT_BODY = process.env.COMMENT_BODY || "";
const BOT_MARKER = "<!-- qwen-bot:status -->";
const MERGE_SHA_RE = /<!-- qwen-merge-sha: ([0-9a-f]{40}) -->/;

function sh(cmd, opts = {}) {
  return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts });
}

function gh(args) {
  return sh(`gh ${args}`);
}

function postComment(body) {
  execSync(`gh issue comment ${ISSUE_NUMBER} --repo ${REPO} --body-file -`, {
    input: `${BOT_MARKER}\n${body}`,
    stdio: ["pipe", "inherit", "inherit"],
  });
}

function readAdmins() {
  const text = readFileSync("automation/admins.txt", "utf8");
  return new Set(
    text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => l.toLowerCase())
  );
}

function labelNames() {
  const issue = JSON.parse(gh(`issue view ${ISSUE_NUMBER} --repo ${REPO} --json labels`));
  return issue.labels.map((l) => l.name);
}

function setLabel({ add, remove }) {
  if (remove) gh(`issue edit ${ISSUE_NUMBER} --repo ${REPO} --remove-label "${remove}"`);
  if (add) gh(`issue edit ${ISSUE_NUMBER} --repo ${REPO} --add-label "${add}"`);
}

function clearPrototypePointerIfPointingAt(branchName) {
  const current = existsSync("automation/prototype-branch.txt")
    ? readFileSync("automation/prototype-branch.txt", "utf8").trim()
    : "";
  if (current !== branchName) return; // some other issue owns the slot now
  writeFileSync("automation/prototype-branch.txt", "");
  sh(`git add automation/prototype-branch.txt`);
  try {
    sh(`git diff --cached --quiet`);
  } catch {
    sh(`git commit -m "Free the prototype slot (#${ISSUE_NUMBER})"`);
    sh(`git push origin main`);
  }
}

function doMerge() {
  const branchName = `ai/issue-${ISSUE_NUMBER}`;
  try {
    sh(`git fetch origin ${branchName}`);
  } catch {
    postComment(
      `There's no prototype branch for this issue (\`${branchName}\`) -- nothing to merge.`
    );
    return;
  }
  sh(`git checkout main`);
  sh(`git pull origin main`);
  const title = JSON.parse(gh(`issue view ${ISSUE_NUMBER} --repo ${REPO} --json title`)).title;
  try {
    sh(
      `git merge --no-ff origin/${branchName} -m ${JSON.stringify(
        `Merge ${branchName}: ${title} (#${ISSUE_NUMBER})`
      )}`
    );
  } catch {
    sh(`git merge --abort`);
    postComment(
      `This branch has a merge conflict with \`main\` and can't be merged ` +
        `automatically -- it needs a manual merge, or try \`#UNDO\` and file ` +
        `a fresh issue once \`main\` has settled.`
    );
    return;
  }
  writeFileSync("automation/prototype-branch.txt", "");
  sh(`git add automation/prototype-branch.txt`);
  try {
    sh(`git commit --amend --no-edit`);
  } catch {
    // merge introduced no pointer change to amend -- fine
  }
  const sha = sh(`git rev-parse HEAD`).trim();
  sh(`git push origin main`);
  try {
    sh(`git push origin --delete ${branchName}`);
  } catch {
    // already gone -- fine
  }
  setLabel({ add: "qwen:merged", remove: "qwen:active" });
  gh(`issue close ${ISSUE_NUMBER} --repo ${REPO}`);
  postComment(
    `Merged to main as \`${sha}\`. Live at https://flybexa.com/ once the deploy ` +
      `finishes (usually under a minute).\n<!-- qwen-merge-sha: ${sha} -->`
  );
}

function doUndo() {
  const labels = labelNames();
  const branchName = `ai/issue-${ISSUE_NUMBER}`;

  if (labels.includes("qwen:merged")) {
    const comments = JSON.parse(
      gh(`api repos/${REPO}/issues/${ISSUE_NUMBER}/comments --jq '[.[] | .body]'`)
    );
    const match = comments.map((b) => b.match(MERGE_SHA_RE)).find(Boolean);
    if (!match) {
      postComment(
        "This was merged, but I can't find the merge commit SHA to revert -- " +
          "someone will need to revert it manually."
      );
      return;
    }
    const sha = match[1];
    sh(`git checkout main`);
    sh(`git pull origin main`);
    sh(`git revert --no-edit -m 1 ${sha}`);
    sh(`git push origin main`);
    setLabel({ add: "qwen:reverted", remove: "qwen:merged" });
    postComment(`Reverted \`${sha}\` from main. flybexa.com will roll back shortly.`);
    return;
  }

  if (labels.includes("qwen:active") || labels.includes("qwen:queued")) {
    try {
      sh(`git push origin --delete ${branchName}`);
    } catch {
      // branch may not exist yet if it's still only queued -- fine
    }
    sh(`git checkout main`);
    sh(`git pull origin main`);
    clearPrototypePointerIfPointingAt(branchName);
    setLabel({ add: "qwen:abandoned", remove: labels.includes("qwen:active") ? "qwen:active" : "qwen:queued" });
    gh(`issue close ${ISSUE_NUMBER} --repo ${REPO}`);
    postComment("Abandoned -- nothing from this issue was ever merged to main.");
    return;
  }

  postComment("Nothing active to undo on this issue.");
}

function main() {
  if (!ISSUE_NUMBER) return;
  const admins = readAdmins();
  if (!admins.has(COMMENT_AUTHOR)) return;

  const hasMerge = /(^|\s)#merge(\s|$)/i.test(COMMENT_BODY);
  const hasUndo = /(^|\s)#undo(\s|$)/i.test(COMMENT_BODY);
  if (!hasMerge && !hasUndo) return;

  sh(`git config user.name "Qwen Automation"`);
  sh(`git config user.email "bexa.aero@gmail.com"`);

  if (hasMerge) doMerge();
  else doUndo();
}

main();
