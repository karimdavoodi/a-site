"use client";
import { useState } from "react";
import { ModalDialog } from "./ModalDialog";
import { Component } from "@/types";


export const ComponentBox = ({
    title,
    titleImageUrl,
    summary,
    description,
    imagesUrls
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
      </div>
      {showDialog && (
        <ModalDialog
            title={title}
            titleImageUrl={titleImageUrl}
            summary={summary}
            description={description}
            imagesUrls={imagesUrls}
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
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem",
    boxSizing: "border-box",
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "var(--box-color)",
    boxShadow: "var(--border-shadow)",
    border: "0px",
    borderRadius: "7px",
    cursor: "pointer",
  },
  image: {
    height: "40%",
    width: "auto",
    objectFit: "contain",
    borderRadius: "5px",
  },
  title: {
    height: "10%",
    fontSize: "0.7rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
    textOverflow: "ellipsis",
    whiteSpace: "break-space",
  },
  summary: {
    height: "50%",
    fontSize: "0.5rem",
    margin: "0.5rem 0",
    textOverflow: "ellipsis",
    overflow: "hidden",
    textAlign: "left",
  },
};
