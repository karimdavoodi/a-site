import { getImageListFromFolder } from "@/utils/images";
import { ComponentsHeader } from "./ComponentsHeader";

export default async function Programs({ title }: { title: string }) {
  const images = await getImageListFromFolder("programs");
  console.info(images, "Programs images");
  if (!images || !images.length) {
    return null;
  }

  return (
    <div style={styles.parent}>
      <ComponentsHeader title={title} />
      <div style={styles.images}>
        {images.map((image, index) => (
          <img
            src={image.url}
            alt={image.name}
            key={index}
            style={styles.image}
          />
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  parent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2%",
  },
  images: {
    width: "95%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    marginLeft: "5%",
  },
  image: {
    width: `38%`,
    margin: "4%",
    border: "1px solid var(--border-color)",
    borderRadius: "5px",
    boxShadow: "var(--border-shadow)",
  },
};
