"use client";

import { useEffect, useState } from "react";
import { Section } from "./Section";
import { Lightbox } from "./Lightbox";
import styles from "./Events.module.css";

interface EventImage {
  url: string;
  name: string;
}

export const Events = ({ title }: { title: string }) => {
  const [images, setImages] = useState<EventImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  if (!images || !images.length) {
    return null;
  }

  const lightboxImages = images.map((img) => ({
    src: img.url,
    alt: img.name,
  }));

  return (
    <Section title={title}>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <button
            key={`${image.name}-${index}`}
            className={styles.thumbnail}
            onClick={() => setLightboxIndex(index)}
            aria-label={`View ${image.name}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={image.name}
              className={styles.image}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null
                ? prev === 0
                  ? lightboxImages.length - 1
                  : prev - 1
                : null
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null
                ? prev === lightboxImages.length - 1
                  ? 0
                  : prev + 1
                : null
            )
          }
        />
      )}
    </Section>
  );
};
