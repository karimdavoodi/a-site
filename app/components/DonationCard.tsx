"use client";

import { useState, useEffect, type CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  container: {
    width: "100%",
    padding: "var(--space-xl) var(--content-padding)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "var(--font-size-2xl)",
    fontWeight: 700,
    color: "var(--color-accent)",
    margin: "0 0 var(--space-xl)",
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: "720px",
    backgroundColor: "var(--color-surface)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    boxShadow: "var(--shadow-card)",
    display: "flex",
    flexDirection: "column",
  },
  info: {
    padding: "var(--space-md) var(--space-lg)",
    fontSize: "0.85rem",
    color: "var(--color-text-secondary)",
    borderTop: "1px solid var(--color-border)",
  },
};

const MOBILE_IFRAME_HEIGHT = 1100;
const DESKTOP_IFRAME_HEIGHT = 1000;

export const DonationCard = () => {
  const [iframeHeight, setIframeHeight] = useState(MOBILE_IFRAME_HEIGHT);

  useEffect(() => {
    const updateHeight = () => {
      setIframeHeight(
        window.innerWidth >= 768 ? DESKTOP_IFRAME_HEIGHT : MOBILE_IFRAME_HEIGHT,
      );
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section id="donation" style={styles.container}>
      <h2 style={styles.title}>Support Us</h2>
      <div style={styles.card}>
        <iframe
          title="Donation form"
          src="https://donorchoice.ca/embedded/alsalaam/6031"
          style={{ width: "100%", height: iframeHeight, border: "none" }}
        />
        <div style={styles.info}>
          <strong>Other ways to donate:</strong>
          <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
            <li>E-Transfer: Alsalaam570@gmail.com</li>
            <li>
              Direct deposit: Transit 00762, Institution 004, Account 5246015
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
