import { Info } from '@/types';
import infoData from '../../public/data/info.json';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.section}>
        <h3>Address</h3>
        <a href={infoData.googleMapsUrl} target="_blank" rel="noopener noreferrer">
          {infoData.address}
        </a>
      </div>
      <div style={styles.section}>
        <h3>Contact</h3>
        <p>Phone: {infoData.contact.phone}</p>
        <p>Email: {infoData.contact.email}</p>
      </div>
      <div style={styles.section}>
        <h3>Useful Links</h3>
        <ul>
          {infoData.usefulLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    height: '13vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'var(--deep-green)',
    color: 'white',
    padding: '20px',
  },
  section: {
    textAlign: 'center',
  },
};

export default Footer;
