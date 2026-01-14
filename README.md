# Simple Masjid website

This is a simple website for who those not have time to maintenance Masjid website!

If the whole UI and structure is ok, then you can feed its constants easy by updating text and image files inside public folder without touching the code.

## Components

### Flayer

A flayer will show as pop up if we have flayer image in /public/assets and fille `flayer` field in json config with that path

### Notice

A permanent pin massage will show on top of page if we fill `pinMessgae` inside json config

### Header and Title

Both header and title get their data from json config file. Currently we do not have menu in header.

### Services, Programs, and About us

These are getting their internal components from `/pubic/components/{programs, services, about_us}`. each component should have title.jpg, title.txt, summary.txt, description.md.

The `description.md` is in **Markdown** format. Therefore you can have rich text also you can refer to more images inside it if you save that images in component folder.

### Events

Event serve from images that keep in Google drive share folder. Because we think event will change often. By uploading you events flayer in google folder, you can update events in the page.

#### Environment variables for access to google drive folder

- **GDRIVE_KEY** : You key to access to google drive files. you can create it in your google console
- **GDRIVE_EVENTS_FOLDER_ID**: the id of folder that you share as viewer for everyone

### News

News are serve from `/public/data/news.txt`. each line is one news start with date.

### Footer

Footer data serve from json config

## Directory Structure

- /app : contains the main page and global definitions
  - global.css : this contain theme and colors that you can change for whole component
- /src : contains all page components
- /public: contains all data that app use to build components
  Below is public dir structure:

```
├── assets
│   ├── icons
│   │   ├── facebook.svg
│   │   ├── instagram.svg
│   │   ├── tiktok.svg
│   │   ├── whatsapp.svg
│   │   ├── x.svg
│   │   └── youtube.svg
│   ├── logo.png             // top site logo
│   └── title_background.jpg // background of site title
├── components
│   ├── about_us
│   │   └── 1
│   │       ├── description.md
│   │       ├── summary.txt
│   │       ├── title.jpg
│   │       ├── title.txt
│   │       ├── *.jpg     // extra image if we need to refer in description.md
│     
├── data
│   ├── info.json   // main config of site
│   └── news.txt    // news

```

## How to build

Run:

```bash
$ npm install
$ export GDRIVE_KEY={your gdrive key}
$ export GDRIVE_EVENTS_FOLDER_ID={you folder id}
$ export RESEND_KEY=={you resend.com key }
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Build to see if it ok:

```bash
$ npm run lint
$ npm run build
$ npm run start
```

Push to repository to release, if using Vercel:

```bash
git commit -m 'your commit message'
git push
```

Please take a look at Issue section of the repository to see what task we have for current stage.
Please have a PR for each of your changes or tasks.
