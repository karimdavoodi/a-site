import { Notice as NoticeType } from '@/types';
import noticeData from '../../public/data/notice.json';


const Notice = () => {
  return (
    <div style={styles.notice}>
      <p>{noticeData.message}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  notice: {
    height: '2vh',
    backgroundColor: 'var(--gold)',
    color: 'var(--deep-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
  },
};

export default Notice;
