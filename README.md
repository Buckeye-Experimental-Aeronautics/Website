# flybexa.com

Website for Buckeye Experimental Aeronautics, a student program building
high-speed, remotely piloted aircraft and autonomous systems.

Live at [flybexa.com](https://flybexa.com).

## Stack

Static multi-page HTML/CSS/JS — **no build step, no framework, no
dependencies to install.** Deployed on Vercel, which serves `site/` directly
(see `vercel.json`).

## Development

Serve the `site/` folder with any static file server and open it, e.g.:

```bash
python -m http.server 8791 --directory site
```

Then visit `http://localhost:8791/`. There's nothing to install and nothing
to build — edit a file under `site/` and reload.

## Site structure

- Pages: `index`, `team`, `program`, `process`, `sponsors`, `join`
  (`.html`, at the root of `site/`). `styleguide.html` documents the design
  system. `concepts*.html` are unlinked, noindexed design sandboxes — not
  live pages.
- CSS: `site/assets/css/styles.css` (all shared components/styles).
- JS: `site/assets/js/` — `site.js` (scroll-progress bar, header condense),
  `programs.js` (the tab/chip panel switcher used on Programs and Process),
  `worktracking.js` (per-program Roadmap timelines), `heatmap.js` (homepage
  activity grid). Both `worktracking.js` and `heatmap.js` fetch
  `site/assets/data/work.json`, which is written by an external sync
  process — see "Live task data" below.
- Images: `site/assets/img/`.

Bump a file's `?v=N` query string in whichever page's `<head>`/`<script>`
references it when you change that CSS or JS file, since browsers cache
aggressively — the version numbers aren't otherwise meaningful.

## Editing content

Most copy is written directly into each page's HTML — there's no CMS or data
file driving it (this is a plain static site, not the earlier React build).
Edit the page directly for wording changes.

| What | Where |
|------|-------|
| Contact emails / roles | Footer of every page, and the Admin roster on `team.html` |
| Sponsor logo | `site/assets/img/sponsor-osu-engineering.png` + references in `index.html`/`sponsors.html` |
| Subteam descriptions | `team.html` and `index.html` — sourced verbatim from each subteam's brochure, see `docs/source-material/` in the project folder |
| SEO title/description | Each page's own `<title>`/`<meta name="description">` in `<head>` |

`/join.html` is a plain email CTA + a 3-step "how to join" list right now —
no form. (The earlier React build had a Google Form here; that's gone in
this rebuild. If a form comes back, note its option strings have to match
the Google Form's choices exactly — Google drops unrecognized values
without reporting an error, so a typo loses real responses silently.)

## Live task data

`site/assets/data/work.json` is **not edited by hand** — it's overwritten by
scheduled GitHub Actions running in the team's private repos:

- `sync-roadmap.mjs` (deployed in the Admin repo) publishes each Vehicle
  project board's tasks for the per-program Roadmap timelines on
  `program.html`.
- `sync-heatmap.mjs` (deployed identically in Engineering, Business, and
  Admin) publishes each repo's closed-issue counts for the homepage activity
  heatmap.

Full setup, field-name assumptions, and the safety rules both scripts follow
(never touch `main` before it's the live branch, never clobber each other's
data) are documented in the project folder's `docs/work-sync/README.md` —
that folder isn't part of this repo since it's about infrastructure in other
repos, not this site.

## Accounts

Three accounts run the site. All three belong to the club, not to any one
member.

| Service | What it does |
|---------|--------------|
| Porkbun | Registers the flybexa.com domain |
| GitHub  | Holds this code |
| Vercel  | Builds and serves the site |

Access questions go to bexa.aero@gmail.com. When officers change over, hand
off all three, not just this repo.
