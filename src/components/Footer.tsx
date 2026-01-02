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
       <SocialMedia/>
      </div>

      <div style={styles.links}>
        <p style={styles.addressTitle}>Useful Links</p>
        <ul style={styles.list}>
          {infoData.usefulLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url} style={styles.alink}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
      </div>
      <p style={styles.copyright}>
        {`Copyright ${year} ${infoData.masjidName}. All Rights Reserved`}
      </p>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  buttom:{
    display: "flex",
    flexDirection: "column",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "var(--deep-dark)",
    color: "white",
    paddingTop: "10px",
  },
  address: {
    fontSize: "0.6rem",
    paddingLeft:'20px'

  },
  addressTitle: {
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  links:{
    paddingRight:'20px'
  },
  list:{
        paddingInlineStart: '15px',
        color: 'white'
  },
  alink:{
    color:'white',
    fontSize:'0.7rem'
  },
  copyright:{
    fontSize: '0.5rem',
    height: '0.3rem',
    textAlign:'center' 
  }
};

export default Footer;
