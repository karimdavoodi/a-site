import infoData from "@public/data/info.json";

export const Notice = () => {
  if (!infoData.pinMessage || infoData.pinMessage.trim() === "") {
    return null;
  }

  return (
    <div style={styles.notice}>
      <p>{infoData.pinMessage}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  notice: {
    // height: '1rem',
    backgroundColor: "var(--gold)",
    color: "var(--backgroud-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "0.5rem",
    overflowY: "auto",
  },
};
