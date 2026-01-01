
const News = async () => {
  // In a real app, you'd fetch news from a file or API
  const newsItems = [
    "Community Iftar this Friday",
    "Quran classes for kids starting next month",
    "Guest lecture by Sheikh Yusuf on Sunday",
    "Eid prayers will be held at 8:00 AM",
    "Volunteer opportunities available for the upcoming event",
    "Weekly sisters' halaqa every Wednesday",
  ];

  return (
    <div style={styles.newsContainer}>
      <h2 style={styles.title}>News & Announcements</h2>
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
    height: '12vh',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: 'var(--deep-green)',
  },
  scrollBox: {
    overflowY: 'auto',
    flex: 1,
  },
  newsItem: {
    padding: '5px 0',
    borderBottom: '1px solid #eee',
  },
};

export default News;
