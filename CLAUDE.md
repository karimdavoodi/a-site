# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) website for **Al-Salaam Islamic Centre** — a content-driven mosque website. Most content lives in `/public/` as static files (JSON config, markdown, text, images), editable without touching application code. Two sections — **Services** and **About Us** — are the exception: their copy is hardcoded in TSX (`app/components/Services.tsx`, `app/components/AboutUs.tsx`) and their images live in `/public/assets/`.

## Commands

```bash
npm run dev                  # Start dev server (localhost:3000)
npm run build                # Production build
npm run start                # Start production server
npm run lint                 # ESLint with --fix
npm run format               # Prettier
npm run gen_prayer_times     # Scrape yearly prayer times via Puppeteer
npm test                     # Jest (jsdom + Testing Library)
```

### Environment Variables

| Variable                  | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| `GDRIVE_KEY`              | Google Drive API key for fetching event/gallery images |
| `GDRIVE_EVENTS_FOLDER_ID` | Google Drive folder ID containing event flyers |
| `GDRIVE_GALERY_FOLDER_ID` | Google Drive folder ID containing gallery images (note the "GALERY" spelling) |
| `RESEND_KEY`              | Resend.com API key for the contact form email  |

## Architecture

### Rendering Model

- The main page (`app/page.tsx`) uses `export const dynamic = "force-dynamic"` — all content is server-rendered on every request.
- **Server Components** (default): read from the filesystem (`fs/promises`) or from `info.json`. These include `Header`, `Hero`, `Footer`, `News`, `Services`, `AboutUs`, `Section`, `SocialMedia`, and the `PrayerTime` wrapper (`PrayerTime.tsx`), which fetches today's prayer data.
- **Client Components** (`"use client"`): handle interactivity — `AlertBanner` (dismissible pin), `DesktopNav`/`MobileNav` (hash scrolling), `ExpandableContent` (read-more cards), `PrayerTimeClient` (prayer times + next-iqamah countdown), `Events` & `Gallery` (Drive slideshows), `Lightbox`, `Donation` (scroll-to-donate button), `DonationCard` (donation iframe), `ContactUs` (form).

### Content Pipeline

Content is driven by the filesystem under `/public/`:

- **`/public/data/info.json`** — Site-wide config: mosque name, slogan, contact info, social media links, Google Maps embed URL, prayer time config (including Juma time), `pinMessage`, `flayer`, and useful links.
- **`/public/data/news.txt`** — One news item per line, rendered by `News` (first item gets a "New" badge).
- **`/public/data/{year}_prayer_times.json`** — Pre-generated yearly prayer times, keyed by `"YYYY-month-D"` (e.g. `"2026-july-15"`).
- **`/public/assets/`** — Logo, hero background, Services/About Us images, and social media SVG icons.
- **Services & About Us copy is hardcoded** in `app/components/Services.tsx` / `app/components/AboutUs.tsx`. Their markdown bodies are rendered to HTML with `renderMarkdown` (`markdown-it` with `imsize` and `attrs` plugins) at module load.

### Google Drive Integration

Event and gallery images are pulled from Google Drive through a **server-side proxy** — the API key never reaches the browser:

1. Client (`Events.tsx` / `Gallery.tsx`) calls `/api/images/listEvents` or `/api/images/listGallery`.
2. The route calls `getImageListFromFolder(folderName)` (`app/utils/images.ts`), which resolves the folder ID from the env var by name, lists files via `listDriveImages` (`app/utils/gdrive.ts`), sorts newest-first, and rewrites each URL to `/api/images/proxy/{fileId}`.
3. The proxy endpoint (`app/api/images/proxy/[fileId]/route.ts`) fetches the image bytes from Google Drive server-side and returns them with `Cache-Control: public, max-age=31536000, s-maxage=31536000, immutable`.
4. Vercel's CDN edge caches the response globally — subsequent visitors get the cached copy without hitting the function or Google's API.

This keeps all Google API traffic behind the server's IP — avoiding the "automated queries" block that happens when many different client IPs use the same API key.

### Shared Sections

The expandable "read more" sections (Services, About Us) share one client component, `ExpandableContentSection` (`app/components/ExpandableContent.tsx`). The server components own the data and pre-rendered markdown; the client component owns the expand/collapse state and applies each section's own CSS module (passed in as a `styles` prop) so the two layouts stay visually distinct.

### Prayer Times Data Flow

All prayer-time logic runs on the mosque's local clock (`America/Toronto`) via `app/utils/timezone.ts`, never on the server's or visitor's clock:

- `getPrayerTimesData()` (`app/components/PrayerTime.tsx`) reads the yearly JSON for today and returns `PrayerTimesData` — used by both the Hero countdown (`NextPrayerCountdown`) and the `PrayerTimes` section.
- `getNextPrayerIndex` / `parsePrayerTimeToMinutes` (`app/utils/nextPrayer.ts`) pick the next prayer and parse times in the mosque's timezone.

### Weekly Prayer Times Page

`/weekly_prayer_times` is a standalone server-rendered page (`app/weekly_prayer_times/page.tsx`) that reads the same yearly JSON and renders a 7-day table starting from today, with day labels, azan/iqamah times, and special Friday highlighting.

### Prayer Times Scraper

`app/utils/get_yearly_prayer_time.ts` uses Puppeteer to scrape [waterloomasjid.com](https://waterloomasjid.com/main/index.php/prayers) and generates the yearly JSON file. Run yearly. Requires Chrome installed; set `CHROME_PATH` env var if needed.

### API Routes

| Route                           | Method | Purpose                                         |
| ------------------------------- | ------ | ----------------------------------------------- |
| `/api/images/listEvents`        | GET    | List event images from Google Drive (URLs proxied)  |
| `/api/images/listGallery`       | GET    | List gallery images from Google Drive (URLs proxied) |
| `/api/images/proxy/[fileId]`    | GET    | Proxy/cache a Google Drive image server-side         |
| `/api/send_mail`                | POST   | Send contact form email via Resend              |

### Path Aliases

- `@/*` → `./src/*` (currently unused — no `src/` directory exists)
- `@public/*` → `./public/*` (used for importing `info.json`)

### Styling

- Most components use CSS Modules (`*.module.css`), one per component, with tokens from `app/globals.css` (`--color-*`, `--space-*`, `--font-size-*`, `--radius-*`, `--shadow-*`).
- A few small components use inline `React.CSSProperties` objects instead: `Donation`, `DonationCard`, `ContactUs`, `SocialMedia`.
- Fonts: Geist Sans and Geist Mono via `next/font/google`.

### TypeScript Types

All shared types live in `app/types/index.ts`: `PrayerTime`, `PrayerTimes`, `PrayerData`, `PrayerTimesData` (prayer display), `ContentItem` (expandable-card sections), and `ImageItem` (the `{ name, url }` shape shared by Events, Gallery, Lightbox, and the `/api/images/*` routes).

## Key Conventions

- Components import `infoData` directly from `@public/data/info.json` rather than passing props through the tree.
- Sections use the shared `Section` wrapper (`app/components/Section.tsx`) for their `<h2>` + content container.
- The `AlertBanner` component conditionally renders based on `pinMessage` being non-empty in the JSON config.
- `News` renders nothing when `news.txt` is empty; `Gallery`/`Events` render nothing when their Drive folder is empty.
- The `Donation` button scrolls to the `#donation` `DonationCard` section rather than opening an overlay.
- No database — all persistent data is file-based or in Google Drive.
