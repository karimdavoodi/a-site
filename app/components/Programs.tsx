"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "./Section";
import { renderMarkdown } from "../utils/markdown";
import styles from "./Programs.module.css";

interface ProgramItem {
  id: string;
  title: string;
  image: string;
  summary: string;
  descriptionMarkdown: string;
}

const PROGRAM_ITEMS: ProgramItem[] = [
  {
    id: "1",
    title: "Mentorship Program",
    image: "/components/programs/1/title.png",
    summary:
      "We believe that no one should walk the path of faith alone. Our combined mentorship program is designed to support both individuals who have recently embraced Islam and families seeking to strengthen their spiritual foundations.",
    descriptionMarkdown:
      "Our program bridges the gap between individual faith and family harmony. We pair New Muslims and families with experienced mentors to navigate the spiritual, social, and practical aspects of living an Islamic life. Whether you are learning your first prayer or seeking to build a more God-conscious home, we provide the community and guidance you need to thrive.",
  },
];

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
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(item.descriptionMarkdown),
            }}
          />
        )}
      </div>
    </div>
  );
}

export function Programs() {
  return (
    <Section title="Programs">
      <div className={styles.grid}>
        {PROGRAM_ITEMS.map((item, i) => (
          <ProgramCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
