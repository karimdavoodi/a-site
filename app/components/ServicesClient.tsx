"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "./Section";
import styles from "./Services.module.css";

interface ServiceItem {
  id: string;
  title: string;
  image: string;
  summary: string;
  descriptionHtml: string;
}

function ServiceCard({ item }: { item: ServiceItem }) {
  const [expanded, setExpanded] = useState(false);
  const plainDescription = item.descriptionHtml.replace(/<[^>]*>/g, "").trim();
  const hasMore = plainDescription !== item.summary;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image}
          alt={item.title}
          width={300}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.textContent}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.summary}>{item.summary}</p>
        {hasMore && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export function ServicesClient({ items }: { items: ServiceItem[] }) {
  return (
    <Section title="Services" id="services">
      <div className={styles.grid}>
        {items.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
}
