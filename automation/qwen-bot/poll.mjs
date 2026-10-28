#!/usr/bin/env node
/*
 * Runs on DSHServer (this laptop), not in GitHub Actions -- it's the only
 * part of this system with access to the local `qwen` CLI.
 *
 * Polls the public Website repo's open issues on a timer. An issue gets
 * worked on if (and only if) it's filed by someone in automation/admins.txt
 * AND its title or body contains the QWEN_TAG below. Everything else about
 * "who's allowed to do what" lives in that one file -- this script and
 * automation/handle-command.mjs (the GitHub Actions side, for #MERGE/#UNDO)
 * both read it fresh every run, so updating the list never needs a restart.
 *
 * State is NOT kept locally -- it's entirely GitHub issue labels and
 * comments, so a crash or reboot just resumes from whatever's on GitHub:
 *   qwen:queued   -- tagged, admin-filed, waiting for the prototype slot
 *   qwen:active   -- the one issue currently occupying the prototype slot
 *   qwen:merged / qwen:abandoned / qwen:reverted -- terminal states, set by
 *                    automation/handle-command.mjs in response to #MERGE/#UNDO
 *
 * Only one issue is ever "active" (one prototype slot, since there's only
 * one local `qwen` process on one laptop) -- everything else queues. The
 * queue is just "open, tagged, admin-filed issues with no label yet or with
 * qwen:queued", so it scales as far as GitHub issues do.
 *
 * See automation/README.md for the full design and how to run this.
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const REPO = "Buckeye-Experimental-Aeronautics/Website";
const WORKDIR =
  process.env.QWEN_BOT_WORKDIR ||
  "C:\\Workspace\\projects\\bexa-website\\repos\\Website";
const LOG_DIR =
  process.env.QWEN_BOT_LOG_DIR ||
  "C:\\Workspace\\projects\\bexa-website\\automation-logs";
const POLL_INTERVAL_MS = Number(process.env.QWEN_BOT_POLL_MS || 60_000);
const QWEN_TAG = "[QWEN]";
const BOT_MARKER = "<!-- qwen-bot:status -->";
const COMMAND_RE = /(^|\s)#(merge|undo)(\s|$)/i;

function loadGhToken() {
  // Read once, keep only in this process's env -- never log it.
  const envPath = "C:\\AgentCredentials\\services.env";
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.startsWith("GH_TOKEN="));
  if (!line) throw new Error("GH_TOKEN not found in services.env");
  const token = line.split("=", 2)[1].trim();
  process.env.GH_TOKEN = token;
  process.env.GITHUB_TOKEN = token;
}

function sh(cmd, opts = {}) {
  return execSync(cmd, {
    cwd: WORKDIR,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...opts,
  });
}

function gh(args) {
  return sh(`gh ${args}`);
}

function ghJson(args) {
  return JSON.parse(gh(args));
}

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  mkdirSync(LOG_DIR, { recursive: true });
  writeFileSync(path.join(LOG_DIR, "poll.log"), line + "\n", { flag: "a" });
}

function readAdmins() {
  const text = readFileSync(
    path.join(WORKDIR, "automation", "admins.txt"),
    "utf8"
  );
  return new Set(
    text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => l.toLowerCase())
  );
}

function hasTag(issue) {
  const haystack = `${issue.title}\n${issue.body || ""}`;
  return haystack.toUpperCase().includes(QWEN_TAG);
}

function labelNames(issue) {
  return (issue.labels || []).map((l) => l.name);
}

function ensureLabelExists(name, color, desc) {
  try {
    gh(
      `label create "${name}" --repo ${REPO} --color ${color} --description "${desc}" --force`
    );
  } catch {
    // already exists or race with another process -- fine either way
  }
}

function getCandidateIssues(admins) {
  const issues = ghJson(
    `issue list --repo ${REPO} --state open --json number,title,body,author,labels,createdAt --limit 200`
  );
  return issues.filter(
    (it) => admins.has(it.author.login.toLowerCase()) && hasTag(it)
  );
}

function getComments(number) {
  // No --jq filter here on purpose: execSync runs through cmd.exe on
  // Windows, which quotes shell arguments differently than the POSIX sh a
  // jq filter string assumes, and mangles it. Fetch the raw objects and map
  // the three fields we need in JS instead, which needs no shell quoting at all.
  const raw = ghJson(`api repos/${REPO}/issues/${number}/comments --paginate`);
  return raw.map((c) => ({
    login: c.user.login,
    body: c.body,
    created_at: c.created_at,
  }));
}

function postComment(number, body) {
  // gh wants the body from stdin via --body-file - to avoid shell-escaping
  // whatever's in the issue/feedback text.
  execSync(`gh issue comment ${number} --repo ${REPO} --body-file -`, {
    cwd: WORKDIR,
    input: `${BOT_MARKER}\n${body}`,
    stdio: ["pipe", "inherit", "inherit"],
  });
}

function setLabel(number, { add, remove }) {
  if (remove) gh(`issue edit ${number} --repo ${REPO} --remove-label "${remove}"`);
  if (add) gh(`issue edit ${number} --repo ${REPO} --add-label "${add}"`);
}

function updatePrototypePointer(branchName) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      // Always called after the branch's real work is already committed and
      // pushed (or deliberately discarded on a Qwen error) -- safe to clear
      // any stray uncommitted state before switching, so a messy worktree
      // never blocks the checkout.
      sh(`git reset --hard`);
      sh(`git checkout main`);
      sh(`git pull --no-rebase origin main --quiet`);
      writeFileSync(
        path.join(WORKDIR, "automation", "prototype-branch.txt"),
        branchName ? branchName + "\n" : ""
      );
      sh(`git add automation/prototype-branch.txt`);
      try {
        sh(`git diff --cached --quiet`);
        return; // no change needed
      } catch {
        // there IS a staged diff, fall through and commit
      }
      sh(
        `git commit -m "Point prototype at ${branchName || "(none)"}"`
      );
      sh(`git push origin main`);
      return;
    } catch (err) {
      log(`updatePrototypePointer attempt ${attempt} failed: ${err.message}`);
    }
  }
  throw new Error("Failed to update prototype pointer after retries");
}

function runQwen(promptText, branchName) {
  const logFile = path.join(LOG_DIR, `issue-${branchName}.log`);
  mkdirSync(LOG_DIR, { recursive: true });
  const siteDir = path.join(WORKDIR, "site");
  const fullPrompt =
    `Implement the following request against the static site at ` +
    `${siteDir} (plain HTML/CSS/JS, no build step, no framework). ` +
    `Only edit files under that site/ directory. Make the minimal, correct ` +
    `change that satisfies the request below -- don't refactor unrelated ` +
    `code or add features that weren't asked for.\n\n` +
    `The request may contain links to files uploaded to the GitHub issue ` +
    `(URLs like github.com/user-attachments/... or ` +
    `user-images.githubusercontent.com/...). Do NOT assume every such link ` +
    `is meant to become a site asset -- most attached images are just ` +
    `screenshots or reference material for context. Only download one and ` +
    `add it to the site if the request text explicitly asks you to (e.g. ` +
    `"use this as the new logo", "add this photo to the team page"). When ` +
    `it does: download it with a shell command (e.g. ` +
    `Invoke-WebRequest -Uri <url> -OutFile <path>) into site/assets/img/ ` +
    `with a short descriptive filename, then reference it from the ` +
    `relevant page.\n\n${promptText}`;
  try {
    const out = execSync(`qwen ${JSON.stringify(fullPrompt)}`, {
      cwd: WORKDIR,
      encoding: "utf8",
    });
    writeFileSync(logFile, out, { flag: "a" });
    return true;
  } catch (err) {
    writeFileSync(logFile, `ERROR: ${err.message}\n${err.stdout || ""}`, {
      flag: "a",
    });
    return false;
  }
}

function commitAndPush(branchName, message) {
  sh(`git add -A`);
  try {
    sh(`git diff --cached --quiet`);
    return false; // nothing to commit
  } catch {
    // staged diff exists
  }
  sh(`git commit -m ${JSON.stringify(message)}`);
  sh(`git push -f origin ${branchName}`);
  return true;
}

function startWork(issue) {
  const branchName = `ai/issue-${issue.number}`;
  log(`Starting work on #${issue.number} on branch ${branchName}`);
  sh(`git fetch origin main --quiet`);
  sh(`git checkout -B ${branchName} origin/main`);

  const ok = runQwen(`Issue title: ${issue.title}\n\n${issue.body || ""}`, String(issue.number));
  const changed = ok && commitAndPush(branchName, `Qwen: ${issue.title} (#${issue.number})`);

  updatePrototypePointer(branchName);

  if (!ok) {
    postComment(
      issue.number,
      "Qwen hit an error while working on this -- nothing was changed. Check " +
        "the logs on the laptop (`automation-logs/issue-" +
        issue.number +
        ".log`). The prototype slot has been freed back up."
    );
    setLabel(issue.number, { add: "qwen:abandoned", remove: "qwen:active" });
    updatePrototypePointer("");
    return;
  }
  if (!changed) {
    postComment(
      issue.number,
      "Qwen looked at this but didn't make any changes -- the request might " +
        "need more detail. Reply with more specifics and it'll try again."
    );
    return; // stay active, waiting for a clarifying comment
  }
  postComment(
    issue.number,
    "Started working on this. The prototype will appear at " +
      "https://flybexa.com/prototype/ once the build finishes (usually " +
      "under a minute). Reply with feedback to keep iterating, comment " +
      "`#MERGE` to publish this to the live site, or `#UNDO` to abandon it."
  );
}

function runIteration(issue, feedbackComments) {
  const branchName = `ai/issue-${issue.number}`;
  log(`Iterating on #${issue.number} (${feedbackComments.length} new comment(s))`);
  sh(`git fetch origin ${branchName} --quiet`);
  sh(`git checkout -B ${branchName} origin/${branchName}`);

  const feedbackText = feedbackComments.map((c) => `- ${c.body}`).join("\n");
  const ok = runQwen(
    `Issue title: ${issue.title}\n\n${issue.body || ""}\n\nFollow-up feedback ` +
      `from the admin on the current prototype:\n${feedbackText}`,
    String(issue.number)
  );
  const changed =
    ok && commitAndPush(branchName, `Qwen: iterate per feedback (#${issue.number})`);

  if (!ok) {
    postComment(
      issue.number,
      "Qwen hit an error applying that feedback -- nothing changed. Check " +
        "the logs on the laptop and try rephrasing."
    );
    return;
  }
  if (!changed) {
    postComment(
      issue.number,
      "Qwen looked at that feedback but didn't make any changes -- try being " +
        "more specific."
    );
    return;
  }
  postComment(
    issue.number,
    "Updated the prototype based on your feedback. Give " +
      "https://flybexa.com/prototype/ a minute to rebuild, then refresh."
  );
}

function tick() {
  sh(`git fetch origin main --quiet`);
  const admins = readAdmins();
  const issues = getCandidateIssues(admins);

  const active = issues.find((it) => labelNames(it).includes("qwen:active"));
  const queued = issues
    .filter((it) => labelNames(it).includes("qwen:queued"))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const untouched = issues.filter(
    (it) =>
      !labelNames(it).some((l) =>
        ["qwen:queued", "qwen:active", "qwen:merged", "qwen:abandoned", "qwen:reverted"].includes(l)
      )
  );

  // Claim or queue brand-new tagged issues.
  for (const issue of untouched) {
    if (active) {
      setLabel(issue.number, { add: "qwen:queued" });
      postComment(
        issue.number,
        "This issue will be worked on once the prototype branch is free."
      );
      queued.push(issue);
      log(`Queued #${issue.number} (slot occupied by #${active.number})`);
    } else {
      setLabel(issue.number, { add: "qwen:active" });
      startWork(issue);
      return; // re-evaluate from scratch next tick
    }
  }

  if (active) {
    const comments = getComments(active.number);
    const lastBotAt = comments
      .filter((c) => c.body.startsWith(BOT_MARKER))
      .map((c) => new Date(c.created_at))
      .sort((a, b) => b - a)[0];
    const feedback = comments.filter(
      (c) =>
        admins.has(c.login.toLowerCase()) &&
        !c.body.startsWith(BOT_MARKER) &&
        !COMMAND_RE.test(c.body) &&
        (!lastBotAt || new Date(c.created_at) > lastBotAt)
    );
    if (feedback.length > 0) {
      runIteration(active, feedback);
    }
    return; // slot occupied, don't also start a queued one this tick
  }

  if (queued.length > 0) {
    const next = queued[0];
    setLabel(next.number, { add: "qwen:active", remove: "qwen:queued" });
    startWork(next);
  }
}

async function loop() {
  loadGhToken();
  ensureLabelExists("qwen:queued", "fbca04", "Waiting for the prototype slot");
  ensureLabelExists("qwen:active", "0e8a16", "Currently occupying the prototype slot");
  ensureLabelExists("qwen:merged", "6f42c1", "Qwen's changes were merged to main");
  ensureLabelExists("qwen:abandoned", "d73a49", "Abandoned before merging");
  ensureLabelExists("qwen:reverted", "d73a49", "Merged, then reverted via #UNDO");
  log("qwen-bot started, polling every " + POLL_INTERVAL_MS / 1000 + "s");
  for (;;) {
    try {
      tick();
    } catch (err) {
      log(`tick() error: ${err.stack || err.message}`);
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
}

loop();
