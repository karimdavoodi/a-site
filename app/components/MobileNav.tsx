"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MobileNav.module.css";

interface NavItem {
  label: string;
  href?: string;
  icon: string;
  action?: () => void;
}

export function MobileNav() {
  const [showDonation, setShowDonation] = useState(false);

  const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Prayer", href: "/weekly_prayer_times", icon: "🕌" },
    {
      label: "Donate",
      icon: "💛",
      action: () => setShowDonation(true),
    },
    { label: "Events", href: "#events", icon: "📅" },
    { label: "Services", href: "#services", icon: "🤝" },
  ];

  return (
    <>
      <nav className={styles.nav} aria-label="Mobile navigation">
        {navItems.map((item) =>
          item.href ? (
            <Link key={item.label} href={item.href} className={styles.item}>
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          ) : (
            <button
              key={item.label}
              className={styles.item}
              onClick={item.action}
              aria-label={item.label}
            >
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
              <span className={styles.label}>{item.label}</span>
            </button>
          ),
        )}
      </nav>

      {showDonation && (
        <div
          className={styles.donationOverlay}
          onClick={() => setShowDonation(false)}
        >
          <div
            className={styles.donationDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.donationClose}
              onClick={() => setShowDonation(false)}
              aria-label="Close donation"
            >
              ×
            </button>
            <iframe
              title="Donation form"
              src="https://donorchoice.ca/embedded/alsalaam/6031"
              className={styles.donationIframe}
            />
            <div className={styles.donationInfo}>
              <strong>Other ways of Donation:</strong>
              <ul>
                <li>E-Transfer: Alsalaam570@gmail.com</li>
                <li>
                  Direct deposit: Transit 00762, Institution 004, Account
                  5246015
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
