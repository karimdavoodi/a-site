import { getPayerTime } from "../utils/prayer";
import infoData from "@public/data/info.json";

type prob = {
  name: string;
  athan: string;
  iqama: string;
};

const PrayerTime = ({ name, athan, iqama }: prob) => {
  return (
    <div style={styles.prayerTimeContainer}>
      <div style={styles.name}> {name}</div>
      <div style={styles.prayerTime}>
        <div style={styles.prayerTimeBox}>
          <span style={styles.timeLabel}>Athan:</span>
          <span style={styles.azan}>{athan}</span>
        </div>
        <div style={styles.prayerTimeBox}>
          <span style={styles.timeLabel}>Iqame:</span>
          <span style={styles.iqama}>{iqama}</span>
        </div>
      </div>
    </div>
  );
};

export const PrayerTimes = async () => {
  const prayerTimes = await getPayerTime();
  if (prayerTimes.day <= 0) {
    return null;
  }

  return (
    <div style={styles.prayerTimesContainer}>
      <div style={styles.title}>Prayer Times</div>
      <div style={styles.juma}>
        Juma Prayer{" "}
        <span style={styles.gold}>{infoData.prayerTime.jumaPrayerTime}</span>
      </div>
      <div style={styles.daily}>
        <PrayerTime
          name={"Fajr"}
          athan={prayerTimes.azan?.fajr || ""}
          iqama={prayerTimes.iqama?.fajr || ""}
        />
        <PrayerTime
          name={"Dhuhr"}
          athan={prayerTimes.azan?.dhuhr || ""}
          iqama={prayerTimes.iqama?.dhuhr || ""}
        />
        <PrayerTime
          name={"Asr"}
          athan={prayerTimes.azan?.asr || ""}
          iqama={prayerTimes.iqama?.asr || ""}
        />
        <PrayerTime
          name={"Maghrib"}
          athan={prayerTimes.azan?.maghrib || ""}
          iqama={prayerTimes.iqama?.maghrib || ""}
        />
        <PrayerTime
          name={"Isha"}
          athan={prayerTimes.azan?.isha || ""}
          iqama={prayerTimes.iqama?.isha || ""}
        />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  prayerTimesContainer: {
    marginTop: "2rem",
    padding: "0.5rem",
    width: "85%",
    boxShadow: "var(--border-shadow)",
    borderRadius: "var(--border-radius)",
    backgroundColor: "var(--box-color)",
    margin: "0.3rem",
    fontSize: "1.2rem",
    color: "var(--text-color)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  juma: {
    fontSize: "1rem",
    marginTop: "5px",
    fontWeight: "bold",
  },
  daily: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    marginTop: "1rem",
    gap: "0.4rem",
  },
  prayerTimeContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.8rem",
    alignItems: "center",
    fontWeight: "bold",
    width: "15.2%",
    maxWidth: "15.2%",
    minWidth: "15.2%",
    padding: "5px",
    textAlign: "center",
  },
  name: {
    fontSize: "1rem",
    marginBottom: "5px",
  },
  prayerTime: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    maxWidth: "80%",
  },
  prayerTimeBox: {
    display: "flex",
    flexFlow: "wrap",
  },
  timeLabel: {
    fontSize: "0.6rem",
    marginRight: "4px",
    alignSelf: "anchor-center",
  },
  azan: {
    fontSize: "0.8rem",
  },
  iqama: {
    color: "var(--gold)",
    fontSize: "0.8rem",
  },
  gold: {
    color: "var(--gold)",
  },
};
export default PrayerTimes;
