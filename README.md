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

Full setup, field-name assumptions, and the safety rules both scripts follow
(never touch `main` before it's the live branch, never clobber each other's
data) are documented in the project folder's `docs/work-sync/README.md` —
that folder isn't part of this repo since it's about infrastructure in other
repos, not this site.

## Deployment

Every push to `main` deploys on its own via Vercel's GitHub integration —
`vercel.json` points it at `site/` as the output directory, no build command.

**Keep this repository public.** Vercel's free Hobby plan will not deploy a
private repository owned by an organisation. Switch it to private and
deploys silently stop firing while the dashboard still reports "Connected" —
nothing reports the failure, which makes it hard to diagnose.

`www.flybexa.com` redirects to the apex domain, which is canonical (a Vercel
domain setting, not anything in this repo).

If the domain ever changes, update it in `site/sitemap.xml` and
`site/robots.txt` — those are the only two places the origin is hard-coded
in this static rebuild (the old React build also had it in
`src/lib/constants.ts` and `index.html`; neither exists as hard-coded origin
strings here since there's no `SITE_URL` constant or canonical `<link>` tag
in the current pages).

## Accounts

Three accounts run the site. All three belong to the club, not to any one
member.

| Service | What it does |
|---------|--------------|
| Porkbun | Registers the flybexa.com domain |
| GitHub  | Holds this code, at `bexa-aero/BEXA` (see below — there's a second, non-deploying copy too) |
| Vercel  | Builds and serves the site |

Access questions go to bexa.aero@gmail.com. When officers change over, hand off
all three, not just this repo.

## Two copies of this repo, and only one of them deploys

Read this before you push anything.

| Remote | Repository | Deploys? |
|--------|------------|----------|
| `bexa-aero` | `bexa-aero/BEXA` | **Yes.** Vercel watches this one |
| `origin` (this repo) | `Buckeye-Experimental-Aeronautics/Website` | No |

This org copy exists so officers get access through org membership instead of
sharing the `bexa-aero` login. **Nothing is served from it by Vercel** — as of
this rebuild it also runs a GitHub Pages preview (see below), which is a
separate, unrelated deployment that only exists here.

**Pushing only to this org repo will look completely successful and change
nothing on flybexa.com.** There is no warning and no error. To actually ship a
change to production, it has to reach `bexa-aero/BEXA`'s `main` — that
requires push access to `bexa-aero/BEXA` specifically, which the agent that
did this rebuild did not have.

Pointing Vercel at this org repo instead would remove this trap entirely. It's
a few clicks in the Vercel dashboard under Settings → Git, and needs the club
Vercel login. Nobody has done it yet.

## GitHub Pages preview (this repo only, temporary)

Since this repo doesn't reach flybexa.com, pushes to its `main` also publish a
throwaway preview via GitHub Pages (`.github/workflows/deploy-pages.yml`) so
people can look at the rebuild without Tailscale/local-server access. It's
served under `/Website/`, so the build step rewrites root-absolute paths
(`/team.html`, `/assets/...`) to `/Website/team.html` etc. **in the published
copy only** — nothing in `site/` itself changes, so this has no effect on the
real Vercel deployment. Every page in the Pages copy also gets a blanket
`noindex` injected so it can't get crawled as duplicate content under the
wrong domain. Delete the workflow whenever this repo starts deploying for
real, or whenever the preview is no longer needed.
