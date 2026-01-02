import { getComponents } from "@/utils";
import { ComponentBox } from "./ComponentBox";
import {ComponentsHeader} from "./ComponentsHeader";

export default function GridSection({ gridTitle }: { gridTitle: string }) {
  const components = getComponents(gridTitle.toLowerCase());
  // console.log("Components in GridSection:", components);
  return (
    <div style={styles.parent}>
      <ComponentsHeader title={gridTitle}/>
      <div style={styles.container}>
        {components.map((component, index) => (
          <div key={index} style={styles.component}>
            <ComponentBox
              id={component.id}
              title={component.title}
              titleImageUrl={component.titleImageUrl}
              summary={component.summary}
              description={component.description}
              imagesUrls={component.imagesUrls}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  parent:{
    display: "flex",
    flexDirection: 'column',
    paddingTop:'1rem'
  },
  container: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  },
  component: {
    width: "10rem",
    minWidth: "10rem",
    height: "10rem",
    minHeight: "10rem",
    margin: "1rem",
  },
};
