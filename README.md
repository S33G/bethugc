# Bethany UGC

A Next.js portfolio for Bethany Delapperall, built from her Instagram and existing Canva portfolio. The visual direction uses warm neutrals, espresso brown, terracotta accents, editorial type, and her original photography.

## Run locally

Requires Node.js 24 and pnpm 11.19.0 (pinned in `.nvmrc` and `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

```sh
pnpm build
pnpm start
```

The production build prerenders the pages. No application secrets or database are required.

## Deploy on Netlify

Connect `S33G/bethugc` and select `codex/bethanyugc-website` as the production branch. The repository's `netlify.toml` supplies the build command (`npm run build`), publish directory (`.next`), Node version, and frozen dependency installation flags. Netlify installs dependencies with the pinned pnpm version; npm only runs the build script, avoiding another dependency installation during the build. `pnpm-workspace.yaml` uses a flat dependency layout for portable packaging. Leave the base directory at the repository root. Netlify automatically applies its current Next.js adapter; do not pin the legacy adapter or add a catch-all SPA redirect.

In the site's Netlify dashboard, enable **Forms → Enable form detection**, then redeploy. After deployment, confirm `brand-enquiry` appears under Forms. Submissions are stored there. Email notifications are optional and must be configured in Netlify's form notifications settings; adding the website does not automatically enable them.

The contact page sends URL-encoded submissions to `/__forms.html`. `public/__forms.html` registers the form and all field names during deployment. Keep these names in sync when changing the form. The visible form preserves entries when a request fails and only shows confirmation after a successful response. A honeypot provides basic spam filtering.

Netlify Forms submission handling runs on Netlify, not with `pnpm dev` or `pnpm start`. Local submissions will show the error state; use the automated tests for request behavior, and verify a submission on the deployed site before relying on it.

If deployment fails, check that the correct branch is selected, clear the Netlify build cache and redeploy, and inspect the first error in the build log. Ensure there are no dashboard overrides setting an unrelated base directory or excluding development dependencies (TypeScript is needed during build).

References: [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), [Netlify build dependencies](https://docs.netlify.com/build/configure-builds/manage-dependencies/), and [OpenNext Forms integration](https://opennext.js.org/netlify/forms).

## Included

- Home, work, about, services, enquiry, and privacy pages.
- Custom SVG wordmark at `public/logo.svg` and matching favicon.
- Nine original campaign examples, downloaded from the supplied Canva portfolio.
- Three Instagram reels downloaded with yt-dlp, with local cover images.
- Filterable work gallery and accessible native video dialogs. Video starts after a visitor clicks play; native controls support volume, seeking, and fullscreen.
- Click-to-load Instagram profile embed. Instagram content is loaded only on request. If Instagram or the visitor’s browser blocks embeds, the locally hosted reels and direct profile link remain available.
- A Netlify enquiry form with validation, a honeypot, submission progress, confirmation, recoverable errors, and a direct email alternative.
- Responsive navigation, keyboard focus styles, reduced-motion support, page metadata, and local fonts.

## Update content

Edit `src/lib/content.ts` for the business email, portfolio examples, Instagram reels, brand names, and services. Add replacement media in `public/media` and reference its local filename. The Instagram reel selection is curated; it does not automatically sync new posts. The optional Instagram profile embed is supplied by Instagram.

The download sources are recorded in `MEDIA-SOURCES.md` and `scripts/video-sources.json`. The site contains no invented performance metrics, testimonials, or rates.

## Media download tools

`scripts/download-portfolio.ps1` downloads the nine campaign videos and posters from the public Canva site. It is safe to rerun: existing non-empty files are retained.

To download another public Instagram reel, install yt-dlp from PyPI and run:

```sh
python -m pip install yt-dlp
python -m yt_dlp --no-playlist --write-thumbnail -o "public/media/instagram-%(id)s.%(ext)s" "INSTAGRAM_REEL_URL"
```

Reel availability is controlled by Instagram. This project uses public downloads and does not contain Instagram login cookies, tokens, or passwords.

## Validation

- Production build and TypeScript check pass.
- Netlify's local production build passes (`npx netlify-cli build --offline`), including Next.js adapter packaging. Stop the local dev server first on Windows so it does not lock the build output. This verifies packaging, not a live deployment or live form acceptance.
- Desktop and 390px mobile layout reviewed.
- Work category filters, native video playback, dialog close, mobile navigation, and FAQ expansion tested in the browser.
- Run `pnpm test` for form encoding, field registration, and failure handling tests; run `pnpm typecheck` for TypeScript and `node scripts/verify-media.mjs` to check media.
- Instagram’s public profile embed endpoint responds successfully, but the Codex preview browser rendered its nested frame blank. The site includes a direct Instagram fallback; verify the embed in the target production browser after deployment.

## Fonts

DM Sans and DM Serif Display are hosted locally under `public/fonts`. Their SIL Open Font License files are included in that directory.
