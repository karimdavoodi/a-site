import type { ReactNode } from "react";
import infoData from "@public/data/info.json";
import { StarPattern } from "./StarPattern";
import { HeroDates } from "./HeroDates";
import styles from "./Hero.module.css";

type HeroProps = {
  children?: ReactNode;
};

export const Hero = ({ children }: HeroProps) => {
  return (
    <section className={styles.hero}>
      <StarPattern />
      <div className={styles.content}>
        <div className={styles.salaam} lang="ar" dir="rtl">
          السَّلَام
        </div>
        <p className={styles.eyebrow}>{infoData.masjidName} · Kitchener, Ontario</p>
        <h1 className={styles.title}>{infoData.masjidSlogan}</h1>
        <HeroDates />
        {children && <div className={styles.countdownSlot}>{children}</div>}
      </div>
    </section>
  );
};
