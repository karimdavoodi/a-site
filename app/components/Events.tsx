"use client";

import { useEffect, useState } from "react";
import { Section } from "./Section";
import styles from "./Events.module.css";

interface EventImage {
  url: string;
  name: string;
}

export const Events = ({ title }: { title: string }) => {
  const [images, setImages] = useState<EventImage[]>([]);

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

  return (
    <Section title={title}>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <img
            key={`${image.name}-${index}`}
            src={image.url}
            alt={image.name}
            className={styles.image}
            loading="lazy"
          />
        ))}
      </div>
    </Section>
  );
};
