"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "./Section";
import { Lightbox } from "./Lightbox";
import styles from "./Gallery.module.css";

interface GalleryImage {
  src: string;
  alt: string;
  thumbnail?: string;
}

const GALLERY_IMAGES: GalleryImage[] = Array.from({ length: 14 }, (_, i) => ({
  src: `/components/gallery/1/${i + 1}.jpg`,
  alt: `Gallery image ${i + 1}`,
}));

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goToPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1) : null
    );
  const goToNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1) : null
    );

  return (
    <Section title="Gallery">
      <div className={styles.grid}>
        {GALLERY_IMAGES.map((img, i) => (
          <button
            key={img.src}
            className={styles.thumbnail}
            onClick={() => openLightbox(i)}
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

      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </Section>
  );
}
