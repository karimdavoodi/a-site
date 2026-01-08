'use client';

import React, { useEffect, useState } from "react";
import { ComponentsHeader } from "./ComponentsHeader";


export default function Programs({ title }: { title: string }) {
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const imagesRes = await fetch(`/api/images/listPrograms`);
        const imagesData = await imagesRes.json();
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
    <div style={styles.parent}>
      <ComponentsHeader title={title} />
      <div style={styles.images}>
        {images.map((image, index) => (
          <img
            src={image.url}
            alt={image.name}
            key={index}
            style={styles.image}
          />
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  parent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2%",
  },
  images: {
    width: "95%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    marginLeft: "5%",
  },
  image: {
    width: `38%`,
    margin: "4%",
    border: "1px solid var(--border-color)",
    borderRadius: "5px",
    boxShadow: "var(--border-shadow)",
  },
};
