"use client";

import { useRouter } from "next/navigation";
import styles from "./MobileNav.module.css";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function MobileNav() {
  const router = useRouter();

  const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Prayer", href: "/weekly_prayer_times", icon: "🕌" },
    { label: "Donate", href: "/#donation", icon: "💛" },
    { label: "Events", href: "/#events", icon: "📅" },
    { label: "Services", href: "/#services", icon: "🤝" },
  ];

  const handleClick = (href: string, e: React.MouseEvent) => {
    const [path, hash] = href.split("#");

    // Plain page link — let the browser handle it
    if (!hash) return;

    e.preventDefault();

    if (window.location.pathname === path || !path) {
      // Already on the target page — smooth scroll to hash
      scrollToHash(hash);
    } else {
      // Navigate to page, then scroll after load
      router.push(href);
      // Delay to allow the page to render, then scroll
      setTimeout(() => scrollToHash(hash), 300);
    }
  };

  return (
    <nav className={styles.nav} aria-label="Mobile navigation">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={styles.item}
          onClick={(e) => handleClick(item.href, e)}
        >
          <span className={styles.icon} aria-hidden="true">
            {item.icon}
          </span>
          <span className={styles.label}>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
