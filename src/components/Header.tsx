import { Info } from '@/types';
import Image from 'next/image';
import infoData from '../../public/data/info.json';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Image src="/file.svg" alt="Logo" width={40} height={40} />
        <h1 style={styles.logoText}>{infoData.masjidName}</h1>
      </div>
      <div style={styles.donate}>
        <button style={styles.donateButton}>Donate</button>
      </div>
      <div style={styles.contact}>
        <p>{infoData.contact.phone}</p>
        <div style={styles.socialIcons}>
          <a href={infoData.contact.socialMedia.facebook}><Image src="/file.svg" alt="Facebook" width={20} height={20} /></a>
          <a href={infoData.contact.socialMedia.twitter}><Image src="/file.svg" alt="Twitter" width={20} height={20} /></a>
          <a href={infoData.contact.socialMedia.instagram}><Image src="/file.svg" alt="Instagram" width={20} height={20} /></a>
        </div>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    height: '6vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    backgroundColor: 'var(--deep-green)',
    color: 'white',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: '10px',
    fontSize: '1.5rem',
  },
  donate: {},
  donateButton: {
    padding: '10px 20px',
    backgroundColor: 'var(--gold)',
    color: 'var(--deep-green)',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  contact: {
    display: 'flex',
    alignItems: 'center',
  },
  socialIcons: {
    display: 'flex',
    marginLeft: '10px',
  },
};

export default Header;
