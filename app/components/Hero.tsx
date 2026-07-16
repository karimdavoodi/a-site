import infoData from "@public/data/info.json";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{infoData.masjidName}</h1>
        <p className={styles.slogan}>{infoData.masjidSlogan}</p>
      </div>
    </section>
  );
};
