import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";
import imsize from "markdown-it-imsize";
import attrs from "markdown-it-attrs";
import infoData from "../public/data/info.json";
import { Component, PrayerTimes } from "@/types";

const md = new MarkdownIt({html: true});
md.use(imsize);
md.use(attrs);

export function renderMarkdown(content: string) {
  return md.render(content);
}

export const getComponents = (pFolder: string): Component[] | undefined => {
  try {
    const componentsDir = path.join(
      process.cwd(),
      "public",
      "components",
      pFolder
    );
    const componentFolders = fs.readdirSync(componentsDir, {
      withFileTypes: true,
    });
    const comps: Component[] = componentFolders
      .filter((folder) => folder.isDirectory())
      .map((folder) => {
        return getComponent(folder.name, pFolder);
      });

    return comps;
  } catch (e) {
    console.log("Error in getComponent", e);
    return undefined;
  }
};

/*
 Component folder structure:
  - title.txt : the title of component
  - title.png | title.jpg : the logo of component
  - summary.txt : the summary of component
  - description.md : the description of component in Markdown format
  - *.jpg | *.png : extra images about the components that we can refer inside description.md
*/

export const getComponent = (folder: string, parent?: string) => {
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
    component.title = fs.readFileSync(titlePath, "utf-8").trim();
  } catch (err) {
    console.error(`Error reading title for ${folderPath}:`, err);
  }
  try {
    component.summary = fs.readFileSync(summaryPath, "utf-8").trim();
  } catch (err) {
    console.error(`Error reading summary for ${folderPath}:`, err);
  }

  try {
    const description = fs.readFileSync(descriptionPath, "utf-8").trim();
    component.description = renderMarkdown(description);
  } catch (err) {
    console.error(`Error reading description for ${folderPath}:`, err);
  }

  const base = parent
    ? `/components/${parent}/${folder}`
    : `/components/${folder}`;
  component.titleImageUrl = fs.existsSync(`${folderPath}/title.png`)
    ? `${base}/title.png`
    : fs.existsSync(`${folderPath}/title.jpg`)
    ? `${base}/title.jpg`
    : "";

  return component;
};

export const getNews = () => {
  let news = "";

  //news is in:  /public/data/news.txt
  const dir = path.join(process.cwd(), "public", "data", "news.txt");

  try {
    news = fs.readFileSync(dir, "utf-8").trim();
  } catch (err) {
    console.error(`Error reading description for ${dir}:`, err);
  }
  return news.split("\n");
};

/**
  This function download CSV file of Athan and Iqama and extract times
  Athan csv forma:
  Day,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha
  1,06:30,07:55,12:26,15:15,16:57,18:23
  ...

  Iqame csv forma:
  Day,Fajr,Dhuhr,Asr,Maghrib,Isha
  1,06:40,12:45,15:30,17:01,19:30
  ...

 */
export const getPayerTime = async () => {
  const prayerTimes: PrayerTimes = {
    day: -1,
  };

  const date = new Date();
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const dayOfMonth = date.getDate();
  prayerTimes.day = dayOfMonth;
  const athanCsvUrl = infoData.prayerAthanCsvUrl.replace("MONTH", monthName);
  const iqameCsvUrl = infoData.prayerIqamaCsvUrl.replace("MONTH", monthName);
  try {
    const [athanRes, iqamaRes] = await Promise.all([
      fetch(athanCsvUrl),
      fetch(iqameCsvUrl),
    ]);
    if (!athanRes.ok || !iqamaRes.ok) {
      throw new Error(
        `Failed to fetch csv files: athan=${athanRes.status} iqama=${iqamaRes.status}`
      );
    }

    const [athanText, iqamaText] = await Promise.all([
      athanRes.text(),
      iqamaRes.text(),
    ]);

    const athanLines = athanText.trim().split(/\r?\n/);
    for (let i = 0; i < athanLines.length; i++) {
      const line = athanLines[i].trim();
      const cols = line.split(",");
      if (cols.length < 7) continue;
      const day = Number(cols[0]);
      if (day === dayOfMonth) {
        prayerTimes.azan = {
          fajr: cols[1],
          dhuhr: cols[3],
          asr: cols[4],
          maghrib: cols[5],
          isha: cols[6],
        };
        break;
      }
    }

    const iqamaLines = iqamaText.trim().split(/\r?\n/);
    for (let i = 0; i < iqamaLines.length; i++) {
      const line = iqamaLines[i].trim();
      const cols = line.split(",");
      if (cols.length < 6) continue;
      const day = Number(cols[0]);
      if (!Number.isFinite(day)) continue;
      if (day === dayOfMonth) {
        prayerTimes.iqama = {
          fajr: cols[1],
          dhuhr: cols[2],
          asr: cols[3],
          maghrib: cols[4],
          isha: cols[5],
        };
        break;
      }
    }
  } catch (err) {
    console.error("Error reading prayer times csv:", err);
  }
  return prayerTimes;
};
