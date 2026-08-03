import fs from "fs/promises";
import path from "path";

export const syncGoogleDriveFolder = async (
  gdriveFolderName: string,
  localPath: string,
) => {
  const folderId =
    gdriveFolderName === "Events" ? process.env.GDRIVE_EVENTS_FOLDER_ID : "";
  const key = process.env.GDRIVE_KEY;
  console.log("GDRIVE_KEY is", key ? "set" : "NOT SET", "| folderId:", folderId);

  if (!folderId) {
    console.error("GDRIVE_EVENTS_FOLDER_ID is not set");
    return null;
  }
  if (!key) {
    console.error("GDRIVE_KEY is not set");
    return null;
  }

  const url =
    "https://www.googleapis.com/drive/v3/files?" +
    new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id,name,mimeType,size,modifiedTime,webContentLink)",
      key: key,
    });

  try {
    const res = await fetch(url);
    const data = (await res.json()) as {
      files?: {
        id: string;
        name: string;
        mimeType: string;
        size: number;
        modifiedTime: string;
        webContentLink?: string;
      }[];
      error?: { code: number; message: string };
    };
    if (data.error) {
      console.error("Google Drive API error:", data.error);
      return null;
    }
    if (!data.files) {
      console.error("No files found in Google Drive folder");
      return null;
    }

    try {
      await fs.mkdir(localPath, { recursive: true });
      //remove all files in localPath
      const existingFiles = await fs.readdir(localPath);
      for (const file of existingFiles) {
        await fs.unlink(path.join(localPath, file));
      }
    } catch (err) {
      console.error(err, "Error preparing local directory:");
    }

    for (const file of data.files) {
      if (
        file.mimeType === "image/png" ||
        file.mimeType === "image/jpeg" ||
        file.mimeType === "image/jpg" ||
        file.mimeType === "image/gif" ||
        file.mimeType === "image/webp"
      ) {
        // webContentLink is a direct download URL that works without auth
        // for files shared with "Anyone with the link"
        const downloadUrl = file.webContentLink;
        if (!downloadUrl) {
          console.error(`No webContentLink for file ${file.name} — is it shared publicly?`);
          continue;
        }
        try {
          const fileRes = await fetch(downloadUrl);
          if (!fileRes.ok) {
            console.error(
              `Failed to download file ${file.name}: ${fileRes.status}`,fileRes
            );
            continue;
          }

          const arrayBuffer = await fileRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const postfix = file.name.split(".").pop()?.toLowerCase() || "jpg";
          const name = `${file.modifiedTime.replace(/[:.-]/g, "_")}.${postfix}`;
          await fs.writeFile(path.join(localPath, name), buffer);
          console.info(`Saved ${file.name} =>  ${name}`);
        } catch (err) {
          console.error(err, `Error on fetching ${file.name}`);
        }
      }
    }

    // Update sync time
    await fs.writeFile(
      path.join(localPath, "sync_time.txt"),
      new Date().toISOString(),
    );
    return true;
  } catch (err) {
    console.error(err, "Error fetching Google Drive files:");
  }
  return null;
};
