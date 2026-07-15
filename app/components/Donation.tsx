"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useOverlayActivity } from "./OverlayActivityContext";

type DonationPageProps = {
  onClose: () => void;
};

const DonationPage = ({ onClose }: DonationPageProps) => {
  const { registerOverlay } = useOverlayActivity();

  useEffect(() => {
    const unregister = registerOverlay();
    return unregister;
  }, [registerOverlay]);

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
    backgroundColor: "var(--gold)",
    color: "var(--black)",
    border: "none",
    padding: "1px 5px",
    borderRadius: "3px",
    fontSize: "1.0rem",
    fontWeight: "bold",
    cursor: "pointer",
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
    backgroundColor: "var(--box-color)",
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
    width: "30px",
    height: "30px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "20px",
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
    color: "var(--white)",
    paddingLeft: "5%",
    padding: "2%",
  },
};
