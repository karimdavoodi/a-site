import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const ALLOWED_FOLDERS = new Set(["old_place", "temporay_place", "new_place"]);
const ALLOWED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);

export async function GET(
  _request: Request,
  context: { params: Promise<{ folder: string }> },
) {
  const { folder } = await context.params;

  if (!ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  const folderPath = path.join(process.cwd(), "public", "components", "donation", folder);

  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    const images = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) =>
        ALLOWED_EXTENSIONS.has(path.extname(fileName).toLowerCase()),
      )
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
      .map((fileName) => ({
        name: fileName,
        url: `/components/donation/${folder}/${fileName}`,
      }));

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error listing donation images:", error);
    return NextResponse.json([], { status: 200 });
  }
}
