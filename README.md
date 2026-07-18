# Al-Salaam Islamic Centre — Website

A content-driven mosque website built with **Next.js 16 (App Router)**. Most content lives in `/public/` as static files (JSON config, Markdown, images) — editable by non-developers without touching application code.

## Getting Started

```bash
# Install dependencies
npm install

# Set required environment variables
export GDRIVE_KEY="your-google-drive-api-key"
export GDRIVE_EVENTS_FOLDER_ID="your-shared-folder-id"
export RESEND_KEY="your-resend-api-key"

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Production build

```bash
npm run lint
npm run build
npm run start
```

## Content Management

All site content is driven by files in `/public/`. No database required.

### Site configuration — `public/data/info.json`

A single JSON file controls the entire site: mosque name, slogan, contact info, social media links, Google Maps embed, prayer time sources, pinned message, and popup flayer image.

| Field | Purpose |
|---|---|
| `masjidName` | Site title and header text |
| `pinMessage` | Persistent banner shown at the top of the page (hidden when empty) |
| `flayer` | Path to an image shown as a popup modal (hidden when empty) |
| `googleMapsUrl` | Embed URL for the contact-us map |
| `prayerTime.*` | Juma time, prayer schedule URLs, and iqama/athan CSV sources |
| `contact.*` | Address, phone numbers, email, and social media links |
| `usefulLinks` | List of external links (e.g., Quran, Hadith) displayed in the footer |

### Components — `public/components/{category}/{id}/`

Each component folder follows this convention:

| File | Purpose |
|---|---|
| `title.txt` | Component title |
| `summary.txt` | Short summary |
| `description.md` | Body content in Markdown (supports images via `imsize` and `attrs` plugins) |
| `title.jpg` or `title.png` | Thumbnail image |
| `*.jpg` / `*.png` | Extra images referenced inside the Markdown |

**Categories:** `about_us`, `donation`, `gallery`, `programs`, `ramadan`, `services`

### News — `public/data/news.txt`

One news item per line. Each line starts with a date.

### Prayer times — `public/data/{year}_prayer_times.json`

Pre-generated yearly prayer times keyed by `"YYYY-M-D"`. Generated via the scraper:

```bash
npm run gen_prayer_times
```

This uses Puppeteer to scrape [waterloomasjid.com](https://waterloomasjid.com/main/index.php/prayers). Requires Chrome installed; set `CHROME_PATH` if not at the default path.

### Events (Google Drive)

Event flyers are pulled from a shared Google Drive folder. A client-side component calls `/api/images/listEvents`, which syncs images from Google Drive (cached for 5 minutes in `/tmp/Events`). Images are named `{modifiedTime}_{name}.{ext}`.

## Features

- **Alert banner** — conditionally shown when `pinMessage` is set in `info.json`
- **Popup flayer** — auto-displays 3 seconds after page load if `flayer` is set; suppresses itself when another overlay is open
- **Prayer times** — server-rendered daily prayer times with a `/weekly_prayer_times` page showing a 7-day table with Friday highlighting
- **Events gallery** — auto-syncs event flyers from Google Drive
- **Donation** — iframe overlay for donation forms; images managed via `/api/donation-images/[folder]`
- **Contact form** — sends email via Resend (`/api/send_mail`)
- **Gallery** — image lightbox with keyboard navigation
- **Responsive design** — mobile and desktop navigation with CSS modules

## Environment Variables

| Variable | Purpose |
|---|---|
| `GDRIVE_KEY` | Google Drive API key for fetching event flyers |
| `GDRIVE_EVENTS_FOLDER_ID` | Shared Google Drive folder ID containing event images |
| `RESEND_KEY` | Resend.com API key for the contact form |
| `CHROME_PATH` | (Optional) Path to Chrome binary for the prayer times scraper |

## API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/images/listEvents` | GET | List synced event images from Google Drive |
| `/api/images/[parent]/[image]` | GET | Serve cached images from `/tmp/` |
| `/api/send_mail` | POST | Send contact form email via Resend |
| `/api/donation-images/[folder]` | GET | List donation-related images from the public folder |

## Project Structure

```
├── app/
│   ├── api/                    # API routes (images, send_mail)
│   ├── components/             # React components (server + client)
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utilities (prayer time scraper, Google Drive sync)
│   ├── weekly_prayer_times/    # 7-day prayer table page
│   ├── globals.css             # Theme variables and global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── public/
│   ├── assets/                 # Logo, title background, social media icons
│   ├── components/             # Content component files (see above)
│   └── data/                   # info.json, news.txt, yearly prayer times
└── package.json
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** CSS modules + CSS custom properties (theme variables in `globals.css`)
- **Markdown:** `markdown-it` with `imsize` and `attrs` plugins
- **Email:** Resend
- **Testing:** Jest + React Testing Library
- **Scraping:** Puppeteer
