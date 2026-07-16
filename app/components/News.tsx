import { getNews } from "../utils/news";
import styles from "./News.module.css";

export const News = async () => {
  const newsItems = await getNews();

  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>News</h2>
      <div className={styles.list}>
        {newsItems.map((item, index) => (
          <article key={index} className={styles.item}>
            {index === 0 && <span className={styles.badge}>New</span>}
            <p className={styles.text}>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
