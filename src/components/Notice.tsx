import infoData from '../../public/data/info.json';


const Notice = () => {
  if(!infoData.noticeMessage || infoData.noticeMessage.trim() === "") {
    return null;
  }

  return (
    <div style={styles.notice}>
      <p>{infoData.noticeMessage}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  notice: {
    height: '1rem',
    backgroundColor: 'var(--gold)',
    color: 'var(--deep-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
  },
};

export default Notice;
