import type { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({
  title,
  subtitle,
  children,
  className,
  id,
}: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.inner}>
        <h2 className="sectionTitle">{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
