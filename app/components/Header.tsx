import Image from "next/image";
import infoData from "@public/data/info.json";
import { SocialMedia } from "./SocialMedia";
import { Donation } from "./Donation";

export const Header = async () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Image src="/assets/logo.png" alt="Logo" width={33} height={20} />
      </div>
      <Donation/>
      <div style={styles.contact}>
        <p>
          {infoData.contact.phones.map((phone) => (
            <a style={styles.phone} key={phone} href={`tel:${phone}`}>
              {phone}
            </a>
          ))}
        </p>
        <SocialMedia />
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    height: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    backgroundColor: "var(--backgroud-color)",
    color: "var(--text-color)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  contact: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.7rem",
  },
  phone: {
    marginRight: "5px",
    color: "var(--text-color)",
  },
};
