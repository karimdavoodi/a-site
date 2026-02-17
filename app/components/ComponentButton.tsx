"use client";

import { useState } from "react";
import { ModalDialog } from "./ModalDialog";
import { Component } from "../types";

type ComponentButtonProbs = Component & {
  buttonText:string
};

export const ComponentButton = ({
  title,
  titleImageUrl,
  summary,
  description,
  buttonText,
}: ComponentButtonProbs ) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <button style={styles.donateButton} onClick={() => setShowDialog(true)}>
        {buttonText}
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
    color: "var(--black)",
    border: "none",
    padding: "1px 5px",
    borderRadius: "3px",
    fontSize: "1.0rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
