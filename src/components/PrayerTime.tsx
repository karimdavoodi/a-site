import { getPayerTime } from "@/utils";
import infoData from "../../public/data/info.json";

type prob = {
  name: string;
  athan: string;
  iqama: string;
};

const PrayerTime = ({ name, athan, iqama }: prob) => {
  return (
    <div style={styles.prayerTime}>
      <div style={styles.name}> {name}</div>
      <div>
        <span style={styles.timeLabel}>Athan:</span> {athan}
      </div>
      <div>
        <span style={styles.timeLabel}>Iqame:</span> <span style={styles.yellow}>{iqama}</span>
      </div>
    </div>
  );
};

export const PrayerTimes = async () => {
  const prayerTimes = await getPayerTime();
  if (prayerTimes.day <= 0) {
    return null;
  }
  // Day,Fajr,Dhuhr,Asr,Maghrib,Isha

  return (
    <div style={styles.prayerTimesContainer}>
      <div style={styles.title}>Prayer Times</div>
      <div style={styles.juma}>Juma Prayer <span style={styles.yellow}>{infoData.jumaPrayerTime}</span></div>
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
    margin: "0.3rem",
    fontSize: "0.6rem",
    color: "while",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  juma: {
    fontSize: "0.7rem",
    marginTop: "5px",
    fontWeight: "bold",
  },
  daily: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "1rem",
    gap: "0.4rem",
  },
  prayerTime: {
    border: "0.3px solid var(--black)",
    boxShadow: "2px 2px 5px 1px #000000",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.5rem",
    alignItems: "center",
    fontWeight: "bold",
    width: "20%",
    padding: "5px",
  },
  name: {
    fontSize: "0.6rem",
    marginBottom: '5px'
  },
  timeLabel: {
    fontSize: "0.4rem",
  },
  yellow: {
    color: "yellow",
  },
};
export default PrayerTimes;
