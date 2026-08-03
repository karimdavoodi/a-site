"use client";

import { useEffect, useCallback } from "react";
import styles from "./Lightbox.module.css";

interface LightboxImage {
  url: string;
  name: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (images.length === 0) return null;

  const image = images[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        className={styles.close}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
      >
        ×
      </button>

      {!isFirst && (
        <button
          className={`${styles.nav} ${styles.navPrev}`}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {!isLast && (
        <button
          className={`${styles.nav} ${styles.navNext}`}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <img
          src={image.url}
          alt={image.name}
          className={styles.image}
        />
        <p className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
