export const ComponentsHeader = ({ title }: { title: string }) => {
  return (
    <div style={styles.header}>
      <div style={styles.titleText}>{title}</div>
      <hr style={styles.line} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    fontSize: "1.3rem",
    display: "flex",
    flexDirection: "row",
    marginLeft: "1rem",
  },
  line: {
    width: "60%",
    opacity: "0.5",
    height: "10px",
  },
  titleText: {
    fontSize: "1.5rem",
    color: "var(--text-color)",
    marginLeft: "1rem",
  },
};
