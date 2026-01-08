import { readFile } from "fs/promises";
import { join, extname } from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  context: { params: Promise<{ parent: string; image: string }> }
) {
  const { parent, image } = await context.params;
  if (
    parent.includes("..") ||
    image.includes("..")
  ) {
    return new NextResponse("Invalid path", { status: 400 });
  }

  const filePath = join(
    "/tmp",
    parent,
    image
  );

  try {
    const file = await readFile(filePath);

    const ext = extname(filePath).toLowerCase();
    const contentType =
      ext === ".png" ? "image/png" :
      ext === ".webp" ? "image/webp" :
      ext === ".gif" ? "image/gif" :
      "image/jpeg";

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
