"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "./Section";
import styles from "./AboutUs.module.css";

interface AboutItem {
  id: string;
  title: string;
  image: string;
  summary: string;
  descriptionHtml: string;
}

function AboutCard({ item }: { item: AboutItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image}
          alt={item.title}
          width={400}
          height={300}
          className={styles.image}
        />
      </div>
      <div className={styles.textContent}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.summary}>{item.summary}</p>
        <button
          className={styles.toggle}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? "Show Less ▲" : "Read More ▼"}
        </button>
        {expanded && (
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
          />
        )}
      </div>
    </div>
  );
}

export function AboutUsClient({ items }: { items: AboutItem[] }) {
  return (
    <Section title="About Us">
      <div className={styles.grid}>
        {items.map((item) => (
          <AboutCard key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
}
