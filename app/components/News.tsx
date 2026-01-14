import { getNews } from "../utils/news";
import { ComponentsHeader } from "./ComponentsHeader";

export const News = async () => {
  const newsItems = await getNews();

  return (
    <div style={styles.newsContainer}>
      <ComponentsHeader title={"News"} />
      <div style={styles.scrollBox}>
        {newsItems.map((item, index) => (
          <div key={index} style={styles.newsItem}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  newsContainer: {
    display: "flex",
    flexDirection: "column",
  },

  scrollBox: {
    width: "80%",
    overflowY: "auto",
    marginLeft: "7%",
  },
  newsItem: {
    paddingTop: "5px",
    fontSize: "0.9rem",
    borderBottom: "1px solid #048d42ff",
  },
};
