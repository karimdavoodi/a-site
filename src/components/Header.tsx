import Image from 'next/image';
import infoData from '../../public/data/info.json';
import {DonateButton} from './DonateButton';

const SOCIAL_ICON_SIZE = 15;

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Image src="/assets/logo.png" alt="Logo" width={35} height={25} />
      </div>
      <DonateButton/>
      <div style={styles.contact}>
        <p>{infoData.contact.phones.map(phone => <a style={styles.phone} key={phone} href={`tel:${phone}`}>{phone}</a>)}</p>
        <div style={styles.socialIcons}>

        {infoData.contact.socialMedia.x && <a href={infoData.contact.socialMedia.x}><Image src="/assets/icons/x.svg" alt="X" width={SOCIAL_ICON_SIZE} height={SOCIAL_ICON_SIZE} style={styles.icon} /></a>}

        {infoData.contact.socialMedia.instagram && <a href={infoData.contact.socialMedia.instagram}><Image src="/assets/icons/instagram.svg" alt="Instagram" width={SOCIAL_ICON_SIZE} height={SOCIAL_ICON_SIZE} style={styles.icon} /></a>}
        {infoData.contact.socialMedia.youtube && <a href={infoData.contact.socialMedia.youtube}><Image src="/assets/icons/youtube.svg" alt="YouTube" width={SOCIAL_ICON_SIZE} height={SOCIAL_ICON_SIZE} style={styles.icon}/></a>}
        {infoData.contact.socialMedia.facebook && <a href={infoData.contact.socialMedia.facebook}><Image src="/assets/icons/facebook.svg" alt="Facebook" width={SOCIAL_ICON_SIZE} height={SOCIAL_ICON_SIZE} style={styles.icon} /></a>}
          
        </div>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    height: '1.7rem',
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
  // donateButton: {
  //   padding: '3px 12px',
  //   backgroundColor: 'var(--gold)',
  //   color: 'var(--deep-green)',
  //   border: 'none',
  //   borderRadius: '3px',
  //   fontSize: '0.7rem',
  //   fontWeight: 'bold',
  //   marginLeft: '5rem',
  //   cursor: 'pointer',
  // },
  contact: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.6rem',
  },
  phone: {
    marginRight: '5px',
    color: 'white',
  },
  socialIcons: {
    display: 'flex',
    marginLeft: '5px',
    alignItems: 'center',
  },
  icon: {
    marginLeft: '5px',
    borderRadius: '2px',
  },
};

export default Header;
