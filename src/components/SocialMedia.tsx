import Image from "next/image";
import infoData from "../../public/data/info.json";

const SOCIAL_ICON_SIZE = 18;

export const SocialMedia = () => {
  return (
    <div style={styles.socialIcons}>
      {infoData.contact.socialMedia.x && (
        <a href={infoData.contact.socialMedia.x}>
          <Image
            src="/assets/icons/x.svg"
            alt="X"
            width={SOCIAL_ICON_SIZE}
            height={SOCIAL_ICON_SIZE}
            style={styles.icon}
          />
        </a>
      )}

      {infoData.contact.socialMedia.instagram && (
        <a href={infoData.contact.socialMedia.instagram}>
          <Image
            src="/assets/icons/instagram.svg"
            alt="Instagram"
            width={SOCIAL_ICON_SIZE}
            height={SOCIAL_ICON_SIZE}
            style={styles.icon}
          />
        </a>
      )}
      {infoData.contact.socialMedia.youtube && (
        <a href={infoData.contact.socialMedia.youtube}>
          <Image
            src="/assets/icons/youtube.svg"
            alt="YouTube"
            width={SOCIAL_ICON_SIZE}
            height={SOCIAL_ICON_SIZE}
            style={styles.icon}
          />
        </a>
      )}
      {infoData.contact.socialMedia.facebook && (
        <a href={infoData.contact.socialMedia.facebook}>
          <Image
            src="/assets/icons/facebook.svg"
            alt="Facebook"
            width={SOCIAL_ICON_SIZE}
            height={SOCIAL_ICON_SIZE}
            style={styles.icon}
          />
        </a>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  socialIcons: {
    display: "flex",
    marginLeft: "5px",
    alignItems: "center",
  },
  icon: {
    marginLeft: "5px",
    borderRadius: "2px",
  },
};
