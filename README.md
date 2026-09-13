# Bethany UGC

A Next.js portfolio for Bethany Delapperall, built from her Instagram and existing Canva portfolio. The visual direction uses warm neutrals, espresso brown, terracotta accents, editorial type, and her original photography.

## Run locally

Requires Node.js 20.9 or newer and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

```sh
pnpm build
pnpm start
```

The production build prerenders the pages. Deploy with a Next.js-compatible host. No database, account credentials, or environment variables are required.

## Included

- Home, work, about, services, enquiry, and privacy pages.
- Custom SVG wordmark at `public/logo.svg` and matching favicon.
- Nine original campaign examples, downloaded from the supplied Canva portfolio.
- Three Instagram reels downloaded with yt-dlp, with local cover images.
- Filterable work gallery and accessible native video dialogs. Video starts after a visitor clicks play; native controls support volume, seeking, and fullscreen.
- Click-to-load Instagram profile embed. Instagram content is loaded only on request. If Instagram or the visitor’s browser blocks embeds, the locally hosted reels and direct profile link remain available.
- An enquiry builder that validates the brief, prepares a mailto link to Bethany’s published email address, and provides a copy alternative. **It does not send or store messages on the server.** The visitor sends the prepared email from their own email service.
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
- Desktop and 390px mobile layout reviewed.
- Work category filters, native video playback, dialog close, mobile navigation, FAQ expansion, and enquiry preparation/copy tested in the browser.
- Instagram’s public profile embed endpoint responds successfully, but the Codex preview browser rendered its nested frame blank. The site includes a direct Instagram fallback; verify the embed in the target production browser after deployment.

## Fonts

DM Sans and DM Serif Display are hosted locally under `public/fonts`. Their SIL Open Font License files are included in that directory.
