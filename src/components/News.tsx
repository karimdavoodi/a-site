import {getNews} from '@/utils'
import {ComponentsHeader} from "./ComponentsHeader";


const News = async () => {
  // Get news from /pu

  const newsItems = getNews();

  return (
    <div style={styles.newsContainer}>
      <ComponentsHeader title={'News'}/>
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
    flexDirection: 'column',
    // alignContent: 'center',
    // alignItems: 'center'
  },

  scrollBox: {
    width: '80%',
    overflowY: 'auto',
    marginLeft: '10%'
    // flex: 1,
  },
  newsItem: {
    padding: '5px 0',
    borderBottom: '1px solid #048d42ff',
  },
};

export default News;
