import infoData from "../../public/data/info.json";

const PrayerTimes = () => {
  return (
    <div style={styles.prayerTimesContainer}>
      <iframe src={infoData.prayerTimeUrl} style={styles.iframe}
      width={'15rem'} height={'7.5rem'} scrolling="no"
      ></iframe>

      <iframe
        src={infoData.googleMapsUrl}
        style={styles.iframe}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};


const styles: Record<string, any> = {
  prayerTimesContainer: {
    // height: '8.5rem',
    // minHeight: '11rem',
    width: '100%',
    // display: 'flex',
    // flexDirection: 'row',
    // padding: '1em',
    // alignItems: 'center',
    // justifyContent: 'space-evenly'
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: '2rem',
  },
  iframe: {
    width: "15rem",
    minWidth: "15rem",
    height: "7.5rem",
    margin: "1rem",
    border: "1px solid var(--black)",
    boxShadow: "var(--border-shadow)",
    borderRadius: "var(--border-radius)",
  },
};
export default PrayerTimes;
