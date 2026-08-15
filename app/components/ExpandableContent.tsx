"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "./Section";
import type { ContentItem } from "../types";

type CSSModuleStyles = Record<string, string>;

interface ExpandableContentSectionProps {
  title: string;
  id?: string;
  items: ContentItem[];
  /** CSS module class map from the section's own `.module.css`. */
  styles: CSSModuleStyles;
  imageWidth?: number;
  imageHeight?: number;
}

function ExpandableCard({
  item,
  styles,
  imageWidth,
  imageHeight,
}: {
  item: ContentItem;
  styles: CSSModuleStyles;
  imageWidth: number;
  imageHeight: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const plainDescription = item.descriptionHtml.replace(/<[^>]*>/g, "").trim();
  const hasMore = plainDescription !== item.summary;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image}
          alt={item.title}
          width={imageWidth}
          height={imageHeight}
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

/**
 * A titled section of expandable "read more" cards. Shared by the Services
 * and About Us sections, which differ only in content, styling, and the
 * section id.
 */
export function ExpandableContentSection({
  title,
  id,
  items,
  styles,
  imageWidth = 300,
  imageHeight = 200,
}: ExpandableContentSectionProps) {
  return (
    <Section title={title} id={id}>
      <div className={styles.grid}>
        {items.map((item) => (
          <ExpandableCard
            key={item.id}
            item={item}
            styles={styles}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
          />
        ))}
      </div>
    </Section>
  );
}
