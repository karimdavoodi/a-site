export const ComponentsHeader = ({title}) => {
  return (
    <div style={styles.header}>
      <hr style={styles.line} />
      <div style={styles.titleText} >{title}</div>
      <hr style={styles.line} />
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {
  header: {
    fontSize: "1.3rem",
    display: "flex",
    flexDirection: "row",
  },
  line:{
    width: "30%"
  },
  titleText: {
    fontSize: '1.5rem',
    color: 'white'
  }
}