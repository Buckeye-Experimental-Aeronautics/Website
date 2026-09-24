# flybexa.com

Website for Buckeye Experimental Aeronautics, a student program building
high-speed, remotely piloted aircraft and autonomous systems.

Live at [flybexa.com](https://flybexa.com).

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion
- Phosphor Icons + Lucide React
- Deployed on Vercel

Use pnpm. Do not use npm.

## Development

```bash
pnpm install     # install dependencies
pnpm dev         # dev server at http://localhost:5173
pnpm build       # production build to dist/
pnpm preview     # serve the production build locally
```

Run `pnpm build` before you push. A type error fails the Vercel build.

## Editing content

Most copy is data, not markup. It lives in `src/lib/constants.ts`: sub-teams,
projects, sponsorship tiers, leadership, contact email, social links, and SEO
titles and descriptions. Edit there rather than in individual components.

| What | Where |
|------|-------|
| Contact email | `CONTACT_EMAIL` in `src/lib/constants.ts` |
| Social links | `SOCIAL_LINKS` in `src/lib/constants.ts` |
| Sponsorship tiers | `SPONSOR_TIERS` in `src/lib/constants.ts` |
| Images and logos | `src/assets/` |

The join form on `/join` posts to a Google Form owned by the club Gmail. The
option strings in `TEAM_OPTIONS` and `YEAR_OPTIONS` have to match that form's
choices exactly. Google drops values it does not recognise without reporting an
error, so a typo here loses real responses silently.

## Accounts

Three accounts run the site. All three belong to the club, not to any one
member.

| Service | What it does |
|---------|--------------|
| Porkbun | Registers the flybexa.com domain |
| GitHub  | Holds this code, at `bexa-aero/BEXA` |
| Vercel  | Builds and serves the site |

Access questions go to bexa.aero@gmail.com. When officers change over, hand off
all three, not just this repo.

## Two copies of this repo, and only one of them deploys

Read this before you push anything.

| Remote | Repository | Deploys? |
|--------|------------|----------|
| `origin` | `bexa-aero/BEXA` | **Yes.** Vercel watches this one |
| `org` | `Buckeye-Experimental-Aeronautics/Website` | No |

The org copy exists so officers get access through org membership instead of
sharing the `bexa-aero` login. Nothing is served from it.

**Pushing only to the org repo will look completely successful and change
nothing on the live site.** There is no warning and no error. Push to both:

```bash
git push origin main && git push org main
```

If they ever drift, `origin` is the one that matters, because it is what the
public sees.

Pointing Vercel at the org repo instead would remove this trap entirely. It is
a few clicks in the Vercel dashboard under Settings, Git, and it needs the club
Vercel login. Nobody has done it yet.

## Deployment

Every push to `main` on `bexa-aero/BEXA` deploys on its own. No button, no
dashboard. Vercel clones the repo, runs `pnpm install` and `pnpm build` on its
own Linux machine, and swaps the result in behind flybexa.com. It takes about
20 seconds.

Two things follow from that. A build passing on your machine does not prove it
passes on Vercel, so run `pnpm build` before pushing rather than after. And a
build that fails cannot take the site down, because Vercel only swaps in a
build that succeeded; the previous deployment keeps serving.

Only `main` reaches flybexa.com. Any other branch can be pushed safely.

To undo a deploy, revert the commit and push:

```bash
git revert -m 1 <merge commit> && git push origin main && git push org main
```

The Vercel dashboard also has Instant Rollback, which swaps back to an earlier
deployment without rebuilding. That is faster but needs the club login.

`vercel.json` handles the single-page-app routing rewrites.

`www.flybexa.com` is a 308 redirect to the apex domain, which is canonical.

**Keep this repository public.** Vercel's free Hobby plan will not deploy a
private repository owned by an organisation. Switch it to private and deploys
stop firing while the dashboard still reports "Connected". Nothing reports the
failure, which makes it hard to diagnose.

If the domain ever changes, update `SITE_URL` in `src/lib/constants.ts` plus
the matching URLs in `public/sitemap.xml`, `public/robots.txt`, and
`index.html`. Those four are the only places the origin is hard-coded.
