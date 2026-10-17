# Launches the Qwen issue-polling bot (automation/qwen-bot/poll.mjs) and
# keeps it running. Meant to be the target of a Scheduled Task set to run
# "At startup" so the system survives a reboot -- see automation/README.md
# for the exact registration command. NOT registered or started by anything
# automatically; this script only runs when something (you, or the
# Scheduled Task once you set it up) launches it.

$repo = "C:\Workspace\projects\bexa-website\repos\Website"
Set-Location $repo

while ($true) {
    node "automation\qwen-bot\poll.mjs"
    # poll.mjs runs forever; if it ever exits (crash, uncaught error), wait
    # a bit and restart rather than taking the whole system down silently.
    Start-Sleep -Seconds 30
}
