"use client";

import { Component } from "@/types";

type ModalProps = Component & {
  onClose: () => void;
}

export const ModalDialog = ({id, title, titleImageUrl, summary, description, imagesUrls, onClose }: ModalProps) => {


  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <img src={titleImageUrl} alt={title} style={styles.titleImage} />
          <h2 style={styles.title}>{title}</h2>
        </div>
        <div style={styles.summary}>
          {summary && <p>{summary}</p>}
        </div>
        <div style={styles.description}>
          {description && <p>{description}</p>}
        </div>
        <div style={styles.images}>
          {imagesUrls.map((url, index) => (
            <img key={index} src={url} alt={`${title} ${index + 1}`} style={styles.image} />
          ))}
        </div>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );  
};
const styles: Record<string, any> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: 'var(--overlay-background)',
    borderRadius: '8px',
    width: '80%',
    height: '80%',
    overflowY: 'auto',
    padding: '1rem',
    boxShadow: "var(--border-shadow)",
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f1f1f1',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  titleImage: {
    height: 'auto',
    width : '20%',
    objectFit: 'contain',
    marginRight: '1rem',
  },
  title: {
    margin: 0,
    fontSize: '1.3rem',
  },
  summary: {
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '0.9rem',
    textAlign: "justify",
    color: 'white',
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  image: {
    width: '30%',
    height: 'auto',
    borderRadius: '4px',
  },
  closeButton: {
    marginTop: '1rem',
    padding: '5px 10px',
    backgroundColor: 'var(--gold)',
    color: 'var(--deep-green)',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'flex-end'
  },
};  