"use client";

import { useState, type CSSProperties } from "react";

type DonationPageProps = {
  onClose: () => void;
};

const DonationPage = ({ onClose }: DonationPageProps) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.dialogAll}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <iframe
          title="Donation form"
          src="https://donorchoice.ca/embedded/alsalaam/6031"
          style={styles.iframe}
        />
        <div style={styles.donationInfo}>
          <strong>Other ways of Donation:</strong>
          <ul>
            <li>E-Transfer: Alsalaam570@gmail.com</li>
            <li>
              Direct deposit: Transit 00762, Institution 004, Account 5246015
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Donation = () => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <button style={styles.donateButton} onClick={() => setShowDialog(true)}>
        Donate
      </button>
      {showDialog && <DonationPage onClose={() => setShowDialog(false)} />}
    </>
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
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    padding: "16px",
  },
  dialogAll: {
    position: "relative",
    width: "90%",
    height: "90%",
    backgroundColor: "var(--color-surface)",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
    border: "none",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    color: "#fff",
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "24px",
    lineHeight: "1",
    zIndex: 1
  },
  iframe: {
    width: "100%",
    flex: 1,
  },
  donationInfo: {
    width: "100%",
    fontSize: "0.8rem",
    color: "var(--color-text-secondary)",
    paddingLeft: "5%",
    padding: "2%",
  },
};
