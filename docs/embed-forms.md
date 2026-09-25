# Embedding a contact/interest form — research notes

Prompted by: "is it possible to embed things like contact forms in a
GitHub-Pages-hosted site" and the follow-up on Sheet output. Not
implemented — this is just the research, for whenever a form actually
gets built.

## The constraint

GitHub Pages (and this repo's temporary Pages preview — see
`.github/workflows/deploy-pages.yml`) serves **static files only**. There's
no backend to receive a form `POST`. That's not specific to GitHub Pages,
though — the real site is a static Vercel deployment too (no server
function, no build step), so this constraint applies either way, not just
to the temporary preview.

A `<form>` can still work, as long as `action` points at something
external that isn't GitHub Pages/Vercel itself.

## Option 1 — Google Forms

Embed the club's existing Google Form in an `<iframe>`, or just link out to
it (what `join.html` already does — same form the old React build posted to
directly).

- **Setup**: none, it already exists.
- **Output**: a Google Sheet automatically, no configuration.
- **Tradeoff**: embedded, it's Google's own styling inside the iframe, not
  the site's design system. Linking out is what's live today.

## Option 2 — Formspree / Getform / Basin (form-backend-as-a-service)

Keep a fully custom `<form>` styled to match the site; point `action` at
the service's endpoint. They handle the POST and email you submissions.

- **Setup**: new third-party account.
- **Output**: their own dashboard by default. Getting submissions into a
  Google Sheet generally needs a **paid tier** plus a Zapier/Make
  integration in between — i.e. two extra services, not just one.
- **Tradeoff**: real custom styling, but adds a paid dependency if a Sheet
  is the goal.

## Option 3 — Google Apps Script Web App bound to a Sheet

Write a small Apps Script (roughly 15 lines) tied to the club's Google
account, deploy it as a Web App URL, and point a custom `<form>`'s
`action` at that URL. It appends each submission as a row.

- **Setup**: write + deploy the script once, inside the same Google
  account/ecosystem already used for the Form (`bexa.aero@gmail.com`).
- **Output**: a Google Sheet, directly, for free.
- **Tradeoff**: more setup than Option 1 (write and deploy actual code,
  and Google periodically tightens Apps Script Web App permissions/auth
  behavior for this exact pattern, so it can need occasional
  re-deployment/maintenance). In exchange, full custom styling **and**
  free Sheet output — the combination neither Option 1 nor the free tier
  of Option 2 gives you.

## Recommendation (if/when this gets built)

Option 3 gives the best combination (custom-styled + free Sheet output) at
the cost of a bit of one-time setup, and stays inside the Google account
the club already owns. Option 1 (current state) is the zero-effort
baseline and is already working in production — no reason to change it
unless custom styling actually matters enough to justify the setup.
