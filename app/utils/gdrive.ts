export interface DriveImage {
  name: string;
  id: string;
  url: string;
  modifiedTime: string;
}

/**
 * Lists image files from a Google Drive folder and returns direct download URLs
 * that the browser can load in <img> tags. Uses the Drive API with the key
 * inlined so no auth or public sharing is required.
 */
export const listDriveImages = async (
  folderId: string,
  apiKey: string,
): Promise<DriveImage[]> => {
  const url =
    "https://www.googleapis.com/drive/v3/files?" +
    new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id,name,mimeType,modifiedTime)",
      key: apiKey,
    });

  const res = await fetch(url);
  const data = (await res.json()) as {
    files?: {
      id: string;
      name: string;
      mimeType: string;
      modifiedTime: string;
    }[];
    error?: { code: number; message: string };
  };

  if (data.error) {
    console.error("Google Drive API error:", data.error);
    return [];
  }
  if (!data.files) {
    console.error("No files found in Google Drive folder");
    return [];
  }

  const imageTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];

  return data.files
    .filter((f) => imageTypes.includes(f.mimeType))
    .map((f) => ({
      name: f.name,
      id: f.id,
      // Direct file content URL — for server-side proxy use only (key never reaches client)
      url: `https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${apiKey}`,
      modifiedTime: f.modifiedTime,
    }));
};
