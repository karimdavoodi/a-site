"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "./Section";
import styles from "./Programs.module.css";

interface ProgramItem {
  id: string;
  title: string;
  image: string;
  summary: string;
  descriptionHtml: string;
}

function ProgramCard({ item, index }: { item: ProgramItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className={`${styles.card} ${isEven ? styles.cardEven : styles.cardOdd}`}>
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

export function ProgramsClient({ items }: { items: ProgramItem[] }) {
  return (
    <Section title="Programs">
      <div className={styles.grid}>
        {items.map((item, i) => (
          <ProgramCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
