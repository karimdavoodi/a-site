"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Section } from "./Section";
import styles from "./Events.module.css";

interface EventImage {
  url: string;
  name: string;
}

export const Events = ({ title }: { title: string }) => {
  const [images, setImages] = useState<EventImage[]>([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const imagesRes = await fetch("/api/images/listEvents", {
          cache: "no-store",
        });
        const imagesData: EventImage[] = await imagesRes.json();
        setImages(imagesData);
      } catch (error) {
        console.error("Error fetching images:", error);
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
    if (trackRef.current) {
      setScrollLeft(trackRef.current.scrollLeft);
    }
  }, []);

  if (!images || !images.length) {
    return null;
  }

  const canScrollLeft = scrollLeft > 0;
  const canScrollRight = trackRef.current
    ? scrollLeft < trackRef.current.scrollWidth - trackRef.current.clientWidth - 1
    : true;

  return (
    <Section title={title} id="events">
      <div className={styles.slideshow}>
        {canScrollLeft && (
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => scrollBy("prev")}
            aria-label="Previous events"
          >
            ‹
          </button>
        )}

        <div
          className={styles.track}
          ref={trackRef}
          onScroll={handleScroll}
        >
          {images.map((image, index) => (
            <div
              key={`${image.name}-${index}`}
              className={styles.slide}
            >
              <img
                src={image.url}
                alt={image.name}
                className={styles.image}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => scrollBy("next")}
            aria-label="Next events"
          >
            ›
          </button>
        )}
      </div>
    </Section>
  );
};
