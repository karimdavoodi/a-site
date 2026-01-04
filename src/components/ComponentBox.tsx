"use client";
import { useState } from "react";
import { ModalDialog } from "./ModalDialog";
import { Component } from "@/types";


export const ComponentBox = ({
    title,
    titleImageUrl,
    summary,
    description,
} : Component) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div
        style={styles.container}
        onClick={() => {
          setShowDialog(true);
        }}
      >
        <img src={titleImageUrl} alt={title} style={styles.image} />
        <p style={styles.title}>{title}</p>
        <p style={styles.summary}>{summary}</p>
        <p style={styles.more}>Click to see more...</p>
      </div>
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
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1rem",
    boxSizing: "border-box",
    backgroundColor: "var(--box-color)",
    boxShadow: "var(--border-shadow)",
    border: "0px",
    borderRadius: "7px",
    cursor: "pointer",
  },
  image: {
    height: "40%",
    maxWidth: "100%",
    borderRadius: "5px",
  },
  title: {
    height: "7%",
    fontSize: "1.1rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
    textOverflow: "ellipsis",
    whiteSpace: "break-space",
  },
  summary: {
    height: "50%",
    fontSize: "0.9rem",
    margin: "0.5rem 0",
    textOverflow: "ellipsis",
    overflow: "hidden",
    textAlign: "left",
  },
  more: {
    height: "1%",
    fontSize: "0.7rem",
    textAlign: "right",
    color: 'var(--gold)',
    alignSelf: 'flex-end'
  },
};
