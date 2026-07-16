import infoData from "@public/data/info.json";
import { ContactUs } from "./ContactUs";
import { SocialMedia } from "./SocialMedia";
import styles from "./Footer.module.css";

export const Footer = () => {
  const year = new Date().getFullYear();
  const phones = infoData.contact.phones.join(", ");

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Column 1: Address */}
        <div className={styles.column}>
          <p className={styles.brandName}>{infoData.masjidName}</p>
          <p className={styles.text}>{infoData.contact.address}</p>
          <p className={styles.text}>Tel: {phones}</p>
          <p className={styles.text}>Email: {infoData.contact.email}</p>
          <div className={styles.contactRow}>
            <ContactUs />
            <SocialMedia />
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div className={styles.column}>
          <p className={styles.columnTitle}>Useful Links</p>
          <ul className={styles.linkList}>
            {infoData.usefulLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Map */}
        <div className={styles.column}>
          <div className={styles.mapWrapper}>
            <iframe
              src={infoData.googleMapsUrl}
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Masjid Location"
            ></iframe>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <p className={styles.copyrightText}>
          Copyright {year} {infoData.masjidName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
