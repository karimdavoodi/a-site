"use client";
import { Component } from "../types";

type ModalProps = Component & {
  onClose: () => void;
};

export const ModalDialog = ({
  title,
  titleImageUrl,
  summary,
  description,
  onClose,
}: ModalProps) => {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        tabIndex={0}
        style={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <img src={titleImageUrl} alt={title} style={styles.titleImage} />
          <h2 style={styles.title}>{title}</h2>
          <button onClick={onClose} style={styles.closeButton}>
            Close
          </button>
        </div>
        <div style={styles.summary}>{summary && <p>{summary}</p>}</div>
        <div style={styles.description}>
          {description && (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </div>
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
  dialog: {
    backgroundColor: "var(--box-color)",
    borderRadius: "8px",
    width: "80%",
    maxHeight: "70%",
    overflowY: "auto",
    padding: "1rem",
    boxShadow: "var(--border-shadow)",
    scrollbarWidth: "thin",
    scrollbarColor: "#888 #f1f1f1",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  titleImage: {
    height: "auto",
    width: "20%",
    objectFit: "contain",
    marginRight: "1rem",
  },
  title: {
    margin: 0,
    fontSize: "1.1rem",
    width: "75%",
  },
  summary: {
    color: "var(--text-color)",
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "2rem",
  },
  description: {
    fontSize: "0.9rem",
    textAlign: "left",
    color: "var(--text-color)",
  },
  images: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  image: {
    width: "30%",
    height: "auto",
    borderRadius: "4px",
  },
  closeButton: {
    padding: "3px 12px",
    backgroundColor: "var(--gold)",
    color: "var(--backgroud-color)",
    fontWeight: "bold",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    alignSelf: "baseline",
    fontSize: "0.7rem",
  },
};
