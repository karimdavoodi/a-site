# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) website for **Al-Salaam Islamic Centre** — a content-driven mosque website where most content lives in `/public/` as static files (JSON config, markdown, images), editable without touching application code.

## Commands

```bash
npm run dev                  # Start dev server (localhost:3000)
npm run build                # Production build
npm run start                # Start production server
npm run lint                 # ESLint with --fix
npm run format               # Prettier
npm run gen_prayer_times     # Scrape yearly prayer times via Puppeteer
```

### Environment Variables

| Variable                  | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| `GDRIVE_KEY`              | Google Drive API key for fetching event images |
| `GDRIVE_EVENTS_FOLDER_ID` | Google Drive folder ID containing event flyers |
| `RESEND_KEY`              | Resend.com API key for the contact form email  |

## Architecture

### Rendering Model

- The main page (`app/page.tsx`) uses `export const dynamic = "force-dynamic"` — all content is server-rendered on every request.
- **Server Components** (default): Read directly from the filesystem (`fs/promises`). These include `Header`, `Title`, `Footer`, `GridSection`, `PrayerTimes`, `Notice`, `News`.
- **Client Components** (`"use client"`): Handle interactivity — `Events` (fetches images via API), `ComponentBox`/`ModalDialog` (click-to-expand), `Flayer` (popup), `Donation` (iframe overlay), `ContactUs` (form).

### Content Pipeline

Content is driven by the filesystem under `/public/`:

- **`/public/data/info.json`** — Site-wide config: mosque name, contact info, social media links, Google Maps embed URL, prayer time config, flayer image path, pin message.
- **`/public/components/{category}/{id}/`** — Each component folder contains:
  - `title.txt` — component title
  - `summary.txt` — short summary
  - `description.md` — Markdown body (rendered via `markdown-it` with `imsize` and `attrs` plugins for rich content and inline images)
  - `title.jpg` or `title.png` — thumbnail image
  - Extra images referenced in the markdown live alongside these files
- **`/public/data/news.txt`** — One news item per line.
- **`/public/data/{year}_prayer_times.json`** — Pre-generated yearly prayer times (keyed by `"YYYY-month-D"`).
- **`/public/assets/`** — Logo, title background, social media SVG icons.

### Google Drive Integration

Event and gallery images are pulled from Google Drive through a **server-side proxy** — the API key never reaches the browser:

1. Client (`Events.tsx` / `Gallery.tsx`) calls `/api/images/listEvents` or `/api/images/listGallery`.
2. Server calls `listDriveImages(folderId, apiKey)` to list files from Google Drive API.
3. Returned image URLs point to `/api/images/proxy/{fileId}` (not Google directly).
4. The proxy endpoint fetches the image bytes from Google Drive server-side and returns them with CDN-friendly cache headers (`s-maxage=86400, stale-while-revalidate`).
5. Vercel's CDN edge caches the response globally — subsequent visitors get the cached copy without hitting the function or Google's API.

This keeps all Google API traffic behind the server's IP — avoiding the "automated queries" block that happens when many different client IPs use the same API key.

### Overlay Coordination

`OverlayActivityContext` tracks whether any overlay (Donation iframe, modal dialog) is currently open. The `Flayer` component (auto-popup after 3 seconds) suppresses itself when another overlay is active.

### Weekly Prayer Times Page

`/weekly_prayer_times` is a standalone server-rendered page that reads the same yearly JSON and renders a 7-day table starting from today, with day labels, azan/iqamah times, and special Friday highlighting.

### Prayer Times Scraper

`app/utils/get_yearly_prayer_time.ts` uses Puppeteer to scrape [waterloomasjid.com](https://waterloomasjid.com/main/index.php/prayers) and generates the yearly JSON file. Run yearly. Requires Chrome installed; set `CHROME_PATH` env var if needed.

### API Routes

| Route                           | Method | Purpose                                         |
| ------------------------------- | ------ | ----------------------------------------------- |
| `/api/images/listEvents`        | GET    | List event images from Google Drive (URLs proxied)  |
| `/api/images/listGallery`       | GET    | List gallery images from Google Drive (URLs proxied) |
| `/api/images/proxy/[fileId]`    | GET    | Proxy/cache a Google Drive image server-side         |
| `/api/send_mail`                | POST   | Send contact form email via Resend              |
| `/api/donation-images/[folder]` | GET    | List donation-related images from public folder |

### Path Aliases

- `@/*` → `./src/*` (currently unused — no `src/` directory exists)
- `@public/*` → `./public/*` (used for importing `info.json`)

### Styling

- Inline `React.CSSProperties` objects in every component (no CSS modules, no Tailwind).
- Theme via CSS custom properties in `app/globals.css`: `--backgroud-color` (sic), `--footer-color`, `--box-color`, `--text-color`, `--gold`, `--black`, `--border-shadow`, `--border-radius`.
- Fonts: Geist Sans and Geist Mono via `next/font/google`.

### TypeScript Types

All shared types are in `app/types/index.ts`: `Info`, `Notice`, `Component`, `PrayerTime`, `PrayerTimes`.

## Key Conventions

- Components import `infoData` directly from `@public/data/info.json` rather than passing props through the tree.
- The `Notice` component conditionally renders based on whether `pinMessage` is non-empty in the JSON config.
- The `Flayer` component conditionally renders based on whether `flayer` path is set in the JSON config.
- No database — all persistent data is file-based.
