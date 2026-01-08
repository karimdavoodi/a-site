import fs from "fs/promises";
import path from "path";

export const getNews = async (): Promise<string[]> => {
  let news = "";
  const dir = path.join(process.cwd(), "public", "data", "news.txt");
  try {
    news = (await fs.readFile(dir, "utf-8")).trim();
  } catch (err) {
    console.error(err, `Error reading description for ${dir}:`);
  }
  return news.split("\n");
};
