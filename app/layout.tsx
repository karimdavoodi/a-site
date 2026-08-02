import type { Metadata } from "next";
import { Marcellus } from "next/font/google";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";
import "./globals.css";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Al-Salaam Islamic Centre",
  description: "Serving the Community with Faith and Compassion!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Al-Salaam",
  },
  icons: {
    apple: "/icons/icon-192x192.png",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "theme-color": "#1a6634",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={marcellus.variable}>
        <a href="#main-content" className="skipToContent">
          Skip to main content
        </a>
        <ServiceWorkerRegistration />
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
