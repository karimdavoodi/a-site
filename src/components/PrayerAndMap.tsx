import infoData from "../../public/data/info.json";
import PrayerTimes from "./PrayerTime";

const PrayerAndMap = () => {
  return (
    <div style={styles.prayerTimesContainer}>
      <div style={styles.iframe}>
        <PrayerTimes />
      </div>

      <iframe
        src={infoData.googleMapsUrl}
        style={styles.iframe}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  prayerTimesContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
  },
  iframe: {
    width: "20rem",
    minWidth: "20rem",
    height: "7.5rem",
    margin: "1rem",
    border: "1px solid var(--black)",
    boxShadow: "var(--border-shadow)",
    borderRadius: "var(--border-radius)",
    backgroundColor: "var(--box-color)",
  },
};
export default PrayerAndMap;
