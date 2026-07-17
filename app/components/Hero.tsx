import type { ReactNode } from "react";
import infoData from "@public/data/info.json";
import styles from "./Hero.module.css";

type HeroProps = {
  children?: ReactNode;
};

export const Hero = ({ children }: HeroProps) => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{infoData.masjidName}</h1>
        <p className={styles.slogan}>{infoData.masjidSlogan}</p>
        {children && <div className={styles.countdownSlot}>{children}</div>}
      </div>
    </section>
  );
};
