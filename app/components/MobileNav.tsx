"use client";

import Link from "next/link";
import styles from "./MobileNav.module.css";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export function MobileNav() {
  const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Prayer", href: "/weekly_prayer_times", icon: "🕌" },
    { label: "Donate", href: "/#donation", icon: "💛" },
    { label: "Events", href: "/#events", icon: "📅" },
    { label: "Services", href: "/#services", icon: "🤝" },
  ];

  return (
    <nav className={styles.nav} aria-label="Mobile navigation">
      {navItems.map((item) => (
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
