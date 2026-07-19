"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Section } from "./Section";
import { Lightbox } from "./Lightbox";
import styles from "./Gallery.module.css";

interface GalleryImage {
  src: string;
  alt: string;
}

const GALLERY_IMAGES: GalleryImage[] = Array.from({ length: 12 }, (_, i) => ({
  src: `/components/gallery/1/${i + 1}.jpg`,
  alt: `Gallery image ${i + 1}`,
}));

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [{ left: canScrollLeft, right: canScrollRight }, setCanScroll] =
    useState({ left: false, right: true });
  const trackRef = useRef<HTMLDivElement>(null);

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

  // Initialize arrow visibility once the track is mounted
  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

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
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              className={styles.slide}
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
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
          images={GALLERY_IMAGES}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null
                ? prev === 0
                  ? GALLERY_IMAGES.length - 1
                  : prev - 1
                : null,
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null
                ? prev === GALLERY_IMAGES.length - 1
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
