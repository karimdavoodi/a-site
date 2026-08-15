"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Section } from "./Section";
import { Lightbox } from "./Lightbox";
import type { ImageItem } from "../types";
import styles from "./Gallery.module.css";

export function Gallery() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [{ left: canScrollLeft, right: canScrollRight }, setCanScroll] =
    useState({ left: false, right: true });
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/images/listGallery", {
          cache: "no-store",
        });
        const data: ImageItem[] = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    }
    fetchImages();
  }, []);

  const scrollBy = useCallback((direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const scrollAmount = track.clientWidth * 0.8;
    const target =
      direction === "next"
        ? track.scrollLeft + scrollAmount
        : track.scrollLeft - scrollAmount;
    track.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScroll({
      left: track.scrollLeft > 0,
      right: track.scrollLeft < track.scrollWidth - track.clientWidth - 1,
    });
  }, []);

  // Initialize arrow visibility once images render into the track
  useEffect(() => {
    handleScroll();
  }, [images, handleScroll]);

  if (!images || !images.length) {
    return null;
  }

  return (
    <Section title="Gallery">
      <div className={styles.slideshow}>
        {canScrollLeft && (
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => scrollBy("prev")}
            aria-label="Previous images"
          >
            ‹
          </button>
        )}

        <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
          {images.map((img, i) => (
            <button
              key={`${img.name}-${i}`}
              className={styles.slide}
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${img.name}`}
            >
              <img
                src={img.url}
                alt={img.name}
                className={styles.image}
              />
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => scrollBy("next")}
            aria-label="Next images"
          >
            ›
          </button>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null
                ? prev === 0
                  ? images.length - 1
                  : prev - 1
                : null,
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null
                ? prev === images.length - 1
                  ? 0
                  : prev + 1
                : null,
            )
          }
        />
      )}
    </Section>
  );
}
