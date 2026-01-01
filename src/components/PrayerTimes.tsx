import infoData from '../../public/data/info.json';

const PrayerTimes = () => {
  return (
    <div style={styles.prayerTimesContainer}>
      <iframe
        src={infoData.prayerTimeUrl}
        style={styles.iframe}
      ></iframe>

      <iframe src={infoData.googleMapsUrl} style={styles.iframe}   loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
};
const styles: Record<string, any> = {
  prayerTimesContainer: {
    height: '35vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: '1em',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  '@media screen and (max-width: 768px)': {
    '.prayerTimesContainer': {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  iframe: {
    width: '40%',
    height: '100%',
    border: '1px solid var(--black)',
    boxShadow: 'var(--border-shadow)',
    borderRadius: 'var(--border-radius)'
  },
}
export default PrayerTimes;
