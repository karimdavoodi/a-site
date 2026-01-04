import { getComponents } from "@/utils";
import { ComponentBox } from "./ComponentBox";
import { ComponentsHeader } from "./ComponentsHeader";

export default function GridSection({ gridTitle, folder }: { gridTitle: string; folder:string }) {
  const components = getComponents(folder);
  if (!components) {
    return null;
  }

  let componentSize = 100;
  if(components.length == 1) componentSize = 86;
  // else if(components.length == 2) componentSize = 41;
  else  componentSize = 41.3;

  const styles: { [key: string]: React.CSSProperties } = {
    parent: {
      display: "flex",
      flexDirection: "column",
      paddingTop: "1rem",
    },
    container: {
      width: "95%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "left",
      marginLeft: '5%'
    },
    component: {
      width: `${componentSize}%`,
      minWidth: `${componentSize}%`,
      height: "14.4rem",
      margin: "1rem",
    },
  };

  return (
    <div style={styles.parent}>
      <ComponentsHeader title={gridTitle} />

      <div style={styles.container}>
        {components.map((component, index) => (
          <div key={index} style={styles.component}>
            <ComponentBox
              id={component.id}
              title={component.title}
              titleImageUrl={component.titleImageUrl}
              summary={component.summary}
              description={component.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
