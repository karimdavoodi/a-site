"use client";

import { useRouter } from "next/navigation";
import styles from "./DesktopNav.module.css";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Prayer", href: "/#prayer" },
  { label: "Donate", href: "/#donation" },
  { label: "Services", href: "/#services" },
  { label: "Events", href: "/#events" },
];

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function DesktopNav() {
  const router = useRouter();

  const handleClick = (href: string, e: React.MouseEvent) => {
    const [path, hash] = href.split("#");

    // Plain page link — let the browser handle it
    if (!hash) return;

    e.preventDefault();

    if (window.location.pathname === path || !path) {
      scrollToHash(hash);
    } else {
      router.push(href);
      setTimeout(() => scrollToHash(hash), 300);
    }
  };

  return (
    <nav className={styles.nav} aria-label="Desktop navigation">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={styles.link}
          onClick={(e) => handleClick(item.href, e)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
