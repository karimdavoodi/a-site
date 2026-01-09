import fs from "fs/promises";
import path from "path";

export const syncGoogleDriveFolder = async (
  gdriveFolderName: string,
  localPath: string,
) => {
  const folderId =
    gdriveFolderName === "programs"
      ? process.env.GDRIVE_PROGRAMS_FOLDER_ID
      : "";
  const key = process.env.GDRIVE_KEY;

  if (!folderId) {
    console.error("GDRIVE_PROGRAMS_FOLDER_ID is not set");
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
      fields: "files(id,name,mimeType,size,modifiedTime)",
      key: key,
    });

  try {
    const res = await fetch(url);
    const data = (await res.json()) as {
      files: {
        id: string;
        name: string;
        mimeType: string;
        size: number;
        modifiedTime: string;
      }[];
    };
    if (!data.files) {
      console.error("No files found in Google Drive folder");
      return null;
    }

    console.log(data.files);
    // data.files.sort(
    //   (a, b) =>
    //     new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime(),
    // );

    await fs.mkdir(localPath, { recursive: true });

    for (const file of data.files) {
      if (
        file.mimeType === "image/png" ||
        file.mimeType === "image/jpeg" ||
        file.mimeType === "image/jpg" ||
        file.mimeType === "image/gif" ||
        file.mimeType === "image/webp"
      ) {
        const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${key}`;
        try {
          const fileRes = await fetch(downloadUrl);
          if (!fileRes.ok) {
            console.error(
              `Failed to download file ${file.name}: ${fileRes.status}`,
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
