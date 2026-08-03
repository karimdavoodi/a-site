import { listDriveImages } from "./gdrive";

export interface ImageItem {
  name: string;
  url: string;
}

/**
 * Returns image metadata for a named Google Drive folder.
 * Images are served directly from Google's CDN via webContentLink URLs.
 */
export const getImageListFromFolder = async (
  folderName: string,
): Promise<ImageItem[] | null> => {
  const folderId =
    folderName === "Events"
      ? process.env.GDRIVE_EVENTS_FOLDER_ID
      : folderName === "Gallery"
        ? process.env.GDRIVE_GALERY_FOLDER_ID
        : "";
  const key = process.env.GDRIVE_KEY;

  if (!folderId) {
    console.error(`GDRIVE_${folderName.toUpperCase()}_FOLDER_ID is not set`);
    return null;
  }
  if (!key) {
    console.error("GDRIVE_KEY is not set");
    return null;
  }

  try {
    const images = await listDriveImages(folderId, key);
    // Sort newest first by modifiedTime
    images.sort(
      (a, b) =>
        new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime(),
    );
    return images;
  } catch (err) {
    console.error(err, `Error listing images from Google Drive folder ${folderName}:`);
    return null;
  }
};
