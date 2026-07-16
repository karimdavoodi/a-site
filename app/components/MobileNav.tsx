"use client";

import Link from "next/link";
import styles from "./MobileNav.module.css";

interface NavItem {
  label: string;
  href: string;
  icon: string; // emoji as placeholder; swap for SVG later
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Prayer", href: "/weekly_prayer_times", icon: "🕌" },
  { label: "Donate", href: "#donate", icon: "💛" },
  { label: "Events", href: "#events", icon: "📅" },
  { label: "More", href: "#more", icon: "☰" },
];

export function MobileNav() {
  return (
    <nav className={styles.nav} aria-label="Mobile navigation">
      {NAV_ITEMS.map((item) => (
        <Link key={item.label} href={item.href} className={styles.item}>
          <span className={styles.icon} aria-hidden="true">
            {item.icon}
          </span>
          <span className={styles.label}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
