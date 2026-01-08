import fs from "fs/promises";
import { syncGoogleDriveFolder } from "./gdrive";

const SYNC_TIME_MINUTE = 5;

export const getImageListFromFolder = async (
  folderPath: string,
): Promise<{ name: string; url: string }[] | null> => {
  const absPath = `/tmp/${folderPath}`;
  if (await folderNotSynced(absPath)) {
    console.info(`Syncing folder ${folderPath} to ${absPath}`);
    await syncGoogleDriveFolder(folderPath, absPath);
  }
  try {
    const files = await fs.readdir(absPath);
    const images = files
      .filter((file: string) =>
        [".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(
          file.slice(file.lastIndexOf(".")).toLowerCase(),
        ),
      )
      .map((file: string) => ({
        name: file,
        url: `/api/images/${folderPath}/${file}`,
      }));
    return images;
  } catch (err) {
    console.error(err, `Error reading images from folder ${absPath}:`);
    return null;
  }
};

export const folderNotSynced = async (localPath: string): Promise<boolean> => {
  try {
    const stats = await fs.stat(`${localPath}/sync_time.txt`);
    const now = new Date();
    const modifiedTime = new Date(stats.mtime);
    const diffMinutes = (now.getTime() - modifiedTime.getTime()) / (1000 * 60);
    return diffMinutes > SYNC_TIME_MINUTE;
  } catch (err) {
    console.error(err, "Error on check sync");
    return true;
  }
};
