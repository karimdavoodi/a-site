import infoData from "../../public/data/info.json";
import { SocialMedia } from "./SocialMedia";

const Footer = () => {
  const year = new Date().getFullYear();
  const phones = infoData.contact.phones.join(", ");
  return (
    <footer style={styles.buttom}>
      <div style={styles.footer}>
        <div style={styles.address}>
          <p style={styles.addressTitle}>{infoData.masjidName}</p>
          <p>{infoData.contact.address}</p>
          <p>Tels: {phones}</p>
          <p>Email: {infoData.contact.email}</p>
          <SocialMedia />
        </div>

        <div style={styles.links}>
          <p style={styles.addressTitle}>Useful Links</p>
          <ul style={styles.list}>
            {infoData.usefulLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" style={styles.alink}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <iframe
          src={infoData.googleMapsUrl}
          style={styles.map}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p style={styles.copyright}>
        {`Copyright ${year} ${infoData.masjidName}. All Rights Reserved`}
      </p>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  buttom: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "var(--footer-color)",
    color: "var(--text-color)",
    paddingTop: "10px",
  },
  address: {
    fontSize: "0.6rem",
    paddingLeft: "20px",
  },
  addressTitle: {
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  links: {
    paddingRight: "5px",
  },
  list: {
    paddingInlineStart: "15px",
    color: "var(--text-color)",
  },
  alink: {
    color: "var(--text-color)",
    fontSize: "0.7rem",
  },
  copyright: {
    fontSize: "0.5rem",
    height: "0.3rem",
    textAlign: "center",
  },
  map: {
    width: "25%",
    height: "70%",
    marginRight: "2%",
    alignSelf: "center",
  },
};

export default Footer;
