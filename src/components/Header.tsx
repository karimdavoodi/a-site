import Image from 'next/image';
import infoData from '../../public/data/info.json';
import {DonateButton} from './DonateButton';
import { getComponent } from '@/utils';
import { SocialMedia } from './SocialMedia';

const SOCIAL_ICON_SIZE = 15;

const Header = () => {

  const donate = getComponent('donation');
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Image src="/assets/logo.png" alt="Logo" width={35} height={25} />
      </div>
      <DonateButton
         title={donate.title}
         summary={donate.summary}
         titleImageUrl={donate.titleImageUrl}
         description={donate.description}
         imagesUrls={donate.imagesUrls}
      />
      <div style={styles.contact}>
        <p>{infoData.contact.phones.map(phone => <a style={styles.phone} key={phone} href={`tel:${phone}`}>{phone}</a>)}</p>
        <SocialMedia/>
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
  contact: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.6rem',
  },
  phone: {
    marginRight: '5px',
    color: 'white',
  },
};

export default Header;
