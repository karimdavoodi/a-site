# Full-Stack Masjid Website
##Your Role: Act as a Senior Full-Stack Next.js Developer. Task: Build a professional, high-performance single-page Masjid website using Next.js (App Router) and TypeScript.

##Architecture Requirements:

 - Data: Use a local filesystem approach. Create a src/data/ folder with JSON files (info.json, notice.json, components.json) containing realistic sample data. Use fs.promises to read these in Server Components.
 - Components: Maximize Server Components. Use a Client Component only for the Modal/Popup logic.
 - Styling: Use a single globals.css. Use Viewport Height (vh) for all row heights to ensure a "pixel-perfect" single-page feel.

### Page Layout (Strict Order & Heights):
 - Notice (2vh): Top alert bar (e.g., "Jummah at 1:30 PM").
 - Header (6vh): Logo (Left), 'Donate' Button (Center), Social Media/Phone (Right).
 - Title/Hero (12vh): Masjid Name h1 with a background image + dark overlay.
 - Prayer Times (25vh): Responsive <iframe> for mawaqit.net.
 - Dynamic Grid (30vh): 3x3 grid of Masjid services (About, Mission, etc.). Clicking a card opens a detailed Modal.
 - News (12vh): A vertical scrollable box for community announcements.
 - Footer (13vh): Address (with Google Maps link), Contact, and Useful Links.

Instructions for Execution (Step-by-Step Guide for the AI):
 - Step 1: Data Modeling Define the TypeScript interfaces and create the JSON files in src/data/. Ensure components.json includes IDs, titles, descriptions, and placeholder image URLs for the 3x3 grid.
 - Step 2: Global Styling Create globals.css using CSS Variables for the theme: Deep Green (#064e3b) and Gold (#d4af37). Define the layout using a Flexbox or Grid container that totals 100vh.
 - Step 3: The Modal (Client Component) Build a Modal.tsx component. It should accept "content" as a prop and use a portal or fixed overlay to show the component details when a grid item is clicked.
 - Step 4: The Shared Row Components (Server Components) Build the Notice, Header, Title, News, and Footer. They must fetch their data directly from the JSON files using async/await.
 - Step 5: The Dynamic Grid (Hybrid) Create the 3x3 Grid. The grid itself should be Server-side, but each card should be a "Client Component" button that updates the Modal state.
 - Step 6: Assembly Assemble everything in app/page.tsx. Ensure the responsive design works so that on screens smaller than 768px, the heights adjust and the 3x3 grid stacks vertically.

