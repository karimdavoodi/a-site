"use client";

import { useState } from "react";
import infoData from "@public/data/info.json";
import styles from "./AlertBanner.module.css";

export const AlertBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (
    !infoData.pinMessage ||
    infoData.pinMessage.trim() === "" ||
    dismissed
  ) {
    return null;
  }

  return (
    <div className={styles.banner} role="alert">
      <span className={styles.icon} aria-hidden="true">
        ℹ
      </span>
      <p className={styles.message}>{infoData.pinMessage}</p>
      <button
        className={styles.dismiss}
        onClick={() => setDismissed(true)}
        aria-label="Dismiss alert"
      >
        ×
      </button>
    </div>
  );
};
