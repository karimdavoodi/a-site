export interface DriveImage {
  name: string;
  url: string;
  modifiedTime: string;
}

/**
 * Lists image files from a Google Drive folder and returns their
 * thumbnailLink URLs (Google CDN) — browser loads directly, no download needed.
 *
 * thumbnailLink points to lh3.googleusercontent.com and serves raw image bytes
 * (unlike webContentLink which returns an HTML download page).
 * We replace the default =s220 size with =s2000 for full resolution.
 */
export const listDriveImages = async (
  folderId: string,
  apiKey: string,
): Promise<DriveImage[]> => {
  const url =
    "https://www.googleapis.com/drive/v3/files?" +
    new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id,name,mimeType,thumbnailLink,modifiedTime)",
      key: apiKey,
    });

  const res = await fetch(url);
  const data = (await res.json()) as {
    files?: {
      id: string;
      name: string;
      mimeType: string;
      thumbnailLink?: string;
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
    .filter((f) => f.thumbnailLink && imageTypes.includes(f.mimeType))
    .map((f) => ({
      name: f.name,
      // Replace =s220 (default thumbnail size) with =s2000 for full resolution
      url: f.thumbnailLink!.replace(/=s\d+$/, "=s2000"),
      modifiedTime: f.modifiedTime,
    }));
};
