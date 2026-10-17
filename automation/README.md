# Qwen issue-driven prototyping

Lets an admin file a GitHub issue, have the local Qwen model implement it as
a live preview at `flybexa.com/prototype/`, iterate on it entirely through
issue comments, then either publish it to the real site with one word or
throw it away with another. Nothing reaches `main` (and therefore
flybexa.com itself) except through the explicit `#MERGE` command.

## Pieces

| Piece | Where it runs | What it does |
|---|---|---|
| `qwen-bot/poll.mjs` | This laptop (DSHServer) | Polls open issues, runs `qwen`, pushes prototype branches, posts status comments |
| `handle-command.mjs` | GitHub Actions | Handles `#MERGE` / `#UNDO` comments -- plain git, no AI |
| `deploy-pages.yml` | GitHub Actions | Publishes `site/` to flybexa.com, plus `/prototype/` from whatever branch is currently active |
| `admins.txt` | Both of the above | The one allow-list both sides read |
| `prototype-branch.txt` | Committed on `main` | Points at whichever branch (if any) is live at `/prototype/` |

## How it works, end to end

1. An admin (someone listed in `automation/admins.txt`) files a GitHub issue
   on this repo with `[QWEN]` somewhere in the title or body.
2. Within a minute, `poll.mjs` (running on this laptop) picks it up:
   - If no other issue currently has the prototype slot, it's claimed
     immediately: Qwen gets the issue text, makes the change on a fresh
     branch `ai/issue-<number>`, and the branch is pushed. The bot comments
     back with the preview link.
   - If the slot is taken, the issue is labeled `qwen:queued` and the bot
     replies **"This issue will be worked on once the prototype branch is
     free."** It'll be picked up automatically, oldest first, the moment the
     active issue is merged or undone. The queue is just open, labeled
     issues, so it scales as far as GitHub issues do -- no limit.
3. `automation/prototype-branch.txt` on `main` is updated to point at the
   new branch, which makes the next Pages deploy publish that branch's
   `site/` under `/prototype/` on the real domain, alongside the normal
   site. Give it about a minute after the bot's comment.
4. The admin reviews `flybexa.com/prototype/` and replies on the issue with
   feedback ("make the button bigger", "wrong color", etc.). `poll.mjs`
   picks up any new comment from an admin and runs another Qwen pass on the
   same branch -- as many rounds as needed.
5. When it's good: comment **`#MERGE`**. A GitHub Actions workflow (no AI
   involved at all) merges the branch into `main`, which is what actually
   makes it live on flybexa.com. The issue is labeled `qwen:merged` and
   closed.
6. If it's bad -- at any point -- comment **`#UNDO`**:
   - Before merging: deletes the prototype branch and frees the slot for
     the next queued issue. Nothing was ever live, so there's nothing to
     roll back on the real site.
   - After merging: reverts the merge commit on `main` with a plain
     `git revert`, straight away, no AI involved. The revert is a normal
     commit, so it deploys like anything else.

`#MERGE` and `#UNDO` both run as GitHub Actions, not on this laptop -- they
work even if the laptop is off or `poll.mjs` has crashed.

## Setting it up

1. **Add admins.** Edit `automation/admins.txt`, one GitHub username per
   line. Only issues filed by (and comments from) people on this list are
   ever acted on.
2. **Merge this branch to `main`.** Until this branch is merged, none of
   this is active -- the workflows don't exist on `main` yet, so nothing
   triggers.
3. **Start the bot on this laptop:**
   ```powershell
   powershell -File C:\Workspace\projects\bexa-website\repos\Website\automation\start-qwen-bot.ps1
   ```
   This blocks and runs forever (polling, by default, once a minute --
   override with the `QWEN_BOT_POLL_MS` env var). Logs go to
   `C:\Workspace\projects\bexa-website\automation-logs\`.
4. **Make it survive a reboot.** Register it as a Scheduled Task that runs
   at startup:
   ```powershell
   $action = New-ScheduledTaskAction -Execute "powershell.exe" `
     -Argument '-NoProfile -File "C:\Workspace\projects\bexa-website\repos\Website\automation\start-qwen-bot.ps1"'
   $trigger = New-ScheduledTaskTrigger -AtStartup
   Register-ScheduledTask -TaskName "QwenIssueBot" -Action $action -Trigger $trigger -RunLevel Highest
   ```
   To start it immediately without rebooting: `Start-ScheduledTask -TaskName "QwenIssueBot"`.
   To stop it: `Stop-ScheduledTask -TaskName "QwenIssueBot"` (or just close the window if you ran it manually).

Nothing above has been run yet -- admins.txt has only `OrangeBannana` in it,
this branch (`feat/qwen-automation`) hasn't been merged, and the Scheduled
Task hasn't been registered. All three are on you to do when you're ready.

## Using it (once set up)

File an issue like:

> **Title:** [QWEN] Make the join button bigger on mobile
>
> **Body:** On the /join page, the "Fill out the interest form" button is
> too small to tap comfortably on a phone. Make it bigger on small screens.

Within a minute you'll get a comment back. Check `flybexa.com/prototype/`,
reply with any corrections, and finish with `#MERGE` or `#UNDO` when done.

## Limits worth knowing

- **One prototype slot.** Only one issue's changes are ever previewable at
  once, since there's one laptop running one `qwen` process. Everything
  else queues.
- **Qwen only ever touches `site/`.** The prompt it's given explicitly
  restricts it to that directory; it has no reason to touch workflows,
  this `automation/` folder, or anything else in the repo.
- **Comment pagination isn't handled.** `poll.mjs` reads an issue's comments
  in one page (GitHub's default: the most recent ~30). Not a realistic
  concern for how this gets used, but if a single issue ever grew a very
  long back-and-forth, only the latest page would be seen.
- **No build/test gate before `#MERGE`.** `#MERGE` publishes whatever's on
  the prototype branch as soon as an admin says so -- review the preview
  yourself before merging, the same way you'd review any change before
  shipping it.
