# flybexa.com

Website for Buckeye Experimental Aeronautics, a student program building
high-speed, remotely piloted aircraft and autonomous systems.

Live at [flybexa.com](https://flybexa.com).

## Stack

Static multi-page HTML/CSS/JS — **no build step, no framework, no
dependencies to install.** Deployed on GitHub Pages, which publishes `site/`
as-is (see `.github/workflows/deploy-pages.yml`).

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
  system and is `noindex`'d but otherwise live. Early design-exploration
  sandbox pages (`concepts*.html`) were never linked from the site and live
  in the project folder's `docs/concepts-sandbox/` instead, not in this repo.
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

`/join.html` links out to the club's Google Form (same form the earlier React
build posted to directly) plus a 3-step "how to join" list.

## Live task data

`site/assets/data/work.json` is **not edited by hand** — it's overwritten by
scheduled GitHub Actions running in the team's private repos:

- `sync-roadmap.mjs` (deployed in the Admin repo) publishes each Vehicle
  project board's tasks for the per-program Roadmap timelines on
  `program.html`.
- `sync-heatmap.mjs` (deployed identically in Engineering, Business, and
  Admin) publishes each repo's closed-issue counts for the homepage activity
  heatmap.

Both push straight to this repo's `main`, so **a sync run is a live deploy** —
each one triggers the Pages workflow and updates flybexa.com within a minute.
That's intended; it's how the roadmap and heatmap stay current without anyone
touching the site.

Full setup, field-name assumptions, and the safety rules both scripts follow
(they only ever write `site/assets/data/work.json`, never clobber each other's
data, and retry instead of force-pushing) are documented in the project
folder's `docs/work-sync/README.md` — that folder isn't part of this repo
since it's about infrastructure in other repos, not this site.

## Deployment

Every push to `main` deploys on its own via GitHub Pages
(`.github/workflows/deploy-pages.yml`). There is no build step — the workflow
uploads `site/` exactly as it is and publishes it. It takes well under a
minute. A failed run can't take the site down; the previous deployment keeps
serving.

Only `main` deploys. Any other branch can be pushed safely.

### The custom domain

`site/CNAME` contains `flybexa.com`, which is what tells Pages to serve at the
custom domain instead of `buckeye-experimental-aeronautics.github.io/Website/`.

**Don't delete `site/CNAME`.** Without it, Pages falls back to serving under
the `/Website/` subpath, and every root-absolute path in the markup
(`/team.html`, `/assets/...`) breaks at once — the pages load but with no CSS,
no images, and dead nav links.

DNS lives at Porkbun and must point at GitHub:

| Record | Host | Value |
|--------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `buckeye-experimental-aeronautics.github.io.` |

After DNS propagates, tick **Enforce HTTPS** in the repo's Settings → Pages.
It stays greyed out until GitHub has verified the domain, which can take up to
a few hours on first setup.

**Keep this repository public.** GitHub Pages doesn't serve from private repos
on the free plan.

If the domain ever changes, update it in `site/CNAME`, `site/sitemap.xml`, and
`site/robots.txt` — those three are the only places the origin is hard-coded.

## Accounts

Three accounts run the site. All three belong to the club, not to any one
member.

| Service | What it does |
|---------|--------------|
| Porkbun | Registers the flybexa.com domain, and points its DNS at GitHub Pages |
| GitHub  | Holds this code **and serves the site**, from this repo |

Access questions go to bexa.aero@gmail.com. When officers change over, hand off
both, not just this repo.

## The old Vercel setup, and the old second repo

The site used to be a React/Vite app deployed by Vercel from a **different**
repo, `bexa-aero/BEXA`, with this org repo existing only as a non-deploying
copy for officer access. That was a genuine trap: pushing here looked
successful and changed nothing on flybexa.com.

That's over. This repo is now the one that deploys, via GitHub Pages. If
`bexa-aero/BEXA` still exists and Vercel is still connected to it, **turn that
deployment off** — otherwise two systems think they own flybexa.com and
whichever holds the DNS wins, silently.
