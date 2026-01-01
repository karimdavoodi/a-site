
import infoData from '../../public/data/info.json';

const Title = () => {
  return (
    <div style={styles.titleContainer}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
      <h1 style={styles.title}>{infoData.masjidName}</h1>
      <h4 style={styles.slogan}>{infoData.masjidSlogan}</h4>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  titleContainer: {
    height: '12vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url('/assets/title_background.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'relative',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: '3rem',
    zIndex: 1,
  },
  slogan: {
    color: 'white',
    fontSize: '1.2rem',
    marginTop: '-2em',
  },
};

export default Title;
