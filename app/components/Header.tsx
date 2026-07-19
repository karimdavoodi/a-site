import Image from "next/image";
import infoData from "@public/data/info.json";
import { SocialMedia } from "./SocialMedia";
import { Donation } from "./Donation";
import { DesktopNav } from "./DesktopNav";
import styles from "./Header.module.css";

export const Header = async () => {
  const phones = infoData.contact.phones;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/assets/logo.png"
          alt="Al-Salaam Islamic Centre"
          width={36}
          height={24}
        />
      </div>

      <DesktopNav />

      <div className={styles.actions}>
        <Donation />

        <div className={styles.contact}>
          {phones.map((phone, i) => (
            <span key={phone}>
              <a className={styles.phone} href={`tel:${phone}`}>
                {phone}
              </a>
              {i < phones.length - 1 && (
                <span className={styles.separator}> | </span>
              )}
            </span>
          ))}
          <SocialMedia />
        </div>
      </div>
    </header>
  );
};
