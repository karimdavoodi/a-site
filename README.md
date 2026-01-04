# Simple Masjid website
This is a simple website for who those not have time to maintenance Masjid website!

If the whole UI and structure is ok, then you can feed its constants easy by updating text and image files inside public folder without touching the code.



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
The Services, Programs, AboutUs, and Donation are in format of component. You can add/remove or update all by modifying public data without touching app code!


## How to build
Run:
```bash
$ npm install
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
