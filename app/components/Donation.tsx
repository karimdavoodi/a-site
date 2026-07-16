"use client";

import { type CSSProperties } from "react";

export const Donation = () => {
  const scrollToDonation = () => {
    const el = document.getElementById("donation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button style={styles.donateButton} onClick={scrollToDonation}>
      Donate
    </button>
  );
};

const styles: Record<string, CSSProperties> = {
  donateButton: {
    backgroundColor: "var(--color-accent)",
    color: "#0d3b2e",
    border: "none",
    padding: "6px 18px",
    borderRadius: "var(--radius-full)",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background-color 0.2s ease",
  },
};
