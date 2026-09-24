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
| GitHub  | Holds this code |
| Vercel  | Builds and serves the site |

Access questions go to bexa.aero@gmail.com. When officers change over, hand off
all three, not just this repo.

## Deployment

Every push to `main` deploys on its own. `vercel.json` handles the
single-page-app routing rewrites.

`www.flybexa.com` is a 308 redirect to the apex domain, which is canonical.

**Keep this repository public.** Vercel's free Hobby plan will not deploy a
private repository owned by an organisation. Switch it to private and deploys
stop firing while the dashboard still reports "Connected". Nothing reports the
failure, which makes it hard to diagnose.

If the domain ever changes, update `SITE_URL` in `src/lib/constants.ts` plus
the matching URLs in `public/sitemap.xml`, `public/robots.txt`, and
`index.html`. Those four are the only places the origin is hard-coded.
