"use client";

import React from "react";
import infoData from "@public/data/info.json";

export const Flayer = () => {
  const [showFlayer, setShowFlayer] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowFlayer(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!infoData.flayer) {
    return null;
  }

  if (!showFlayer) {
    return null;
  }

  return (
    <div style={styles.overlay} onClick={() => setShowFlayer(false)}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <img src={infoData.flayer} alt="Flayer" style={styles.image} />
        <button
          onClick={() => setShowFlayer(false)}
          style={styles.close}
          aria-label="Close flayer"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  image: {
    height: "80%",
    maxHeight: "80%",
    maxWidth: "80%",
    borderRadius: "10px",
    boxShadow: "var(--border-shadow)",
  },
  dialog: {
    display: "flex",
    justifyContent: "center",
    overflowY: "auto",
    maxHeight: "90%",
    maxWidth: "90%",
    scrollbarWidth: "none",
  },
  close: {
    background: "rgba(0,0,0,0.6)",
    color: "var(--text-color)",
    border: "none",
    height: "3rem",
    cursor: "pointer",
    fontSize: "2rem",
    zIndex: 1,
  },
};
