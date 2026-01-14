import fs from "fs/promises";
import path from "path";
import { Component } from "../types";
import { renderMarkdown } from "./markdown";

export const getComponents = async (
  pFolder: string,
): Promise<Component[] | undefined> => {
  try {
    const componentsDir = path.join(
      process.cwd(),
      "public",
      "components",
      pFolder,
    );
    const componentFolders = await fs.readdir(componentsDir, {
      withFileTypes: true,
    });
    const comps: Component[] = [];
    for (const folder of componentFolders) {
      if (folder.isDirectory()) {
        const comp = await getComponent(folder.name, pFolder);
        comps.push(comp);
      }
    }
    return comps;
  } catch (e) {
    console.error(e, "Error in getComponent");
    return undefined;
  }
};

export const getComponent = async (
  folder: string,
  parent?: string,
): Promise<Component> => {
  const folderPath = parent
    ? path.join(process.cwd(), "public", "components", parent, folder)
    : path.join(process.cwd(), "public", "components", folder);

  const component: Component = {
    id: folder,
    title: "",
    summary: "",
    description: "",
    titleImageUrl: "",
  };

  const summaryPath = path.join(folderPath, "summary.txt");
  const titlePath = path.join(folderPath, "title.txt");
  const descriptionPath = path.join(folderPath, "description.md");

  try {
    component.title = (await fs.readFile(titlePath, "utf-8")).trim();
  } catch (err) {
    console.error(err, `Error reading title for ${folderPath}:`);
  }
  try {
    component.summary = (await fs.readFile(summaryPath, "utf-8")).trim();
  } catch (err) {
    console.error(err, `Error reading summary for ${folderPath}:`);
  }

  try {
    const description = (await fs.readFile(descriptionPath, "utf-8")).trim();
    component.description = renderMarkdown(description);
  } catch (err) {
    console.error(err, `Error reading description for ${folderPath}:`);
  }

  const base = parent
    ? `/components/${parent}/${folder}`
    : `/components/${folder}`;
  try {
    await fs.access(path.join(folderPath, "title.png"));
    component.titleImageUrl = `${base}/title.png`;
  } catch {
    try {
      await fs.access(path.join(folderPath, "title.jpg"));
      component.titleImageUrl = `${base}/title.jpg`;
    } catch {
      component.titleImageUrl = "";
    }
  }

  return component;
};
