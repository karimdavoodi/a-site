"use client";

import { useState } from "react";
import { ModalDialog } from "./ModalDialog";
import { Component } from "../types";

export const DonateButton = ({
  title,
  titleImageUrl,
  summary,
  description,
}: Component) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <button style={styles.donateButton} onClick={() => setShowDialog(true)}>
        Donate
      </button>
      {showDialog && (
        <ModalDialog
          title={title}
          titleImageUrl={titleImageUrl}
          summary={summary}
          description={description}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  donateButton: {
    backgroundColor: "var(--gold)",
    color: "var(--backgroud-color)",
    border: "none",
    padding: "1px 5px",
    borderRadius: "3px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
