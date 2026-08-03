import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Proxies a Google Drive image through the server so the API key never
 * reaches the client.
 *
 * No filesystem caching — on Vercel serverless, /tmp/ is per-instance and
 * disappears on cold starts.  Instead we use Cache-Control to let Vercel's
 * CDN edge cache the response across all instances.
 *
 * GET /api/images/proxy/[fileId]
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;

  // Basic sanitisation — file IDs are alphanumeric with dashes/underscores
  if (!/^[a-zA-Z0-9_-]+$/.test(fileId)) {
    return new NextResponse("Invalid file ID", { status: 400 });
  }

  const key = process.env.GDRIVE_KEY;
  if (!key) {
    console.error("GDRIVE_KEY is not set — cannot proxy image");
    return new NextResponse("Server configuration error", { status: 500 });
  }

  const driveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${key}`;

  let res: Response;
  try {
    res = await fetch(driveUrl);
  } catch (err) {
    console.error(`Failed to fetch image ${fileId} from Google Drive:`, err);
    return new NextResponse("Failed to fetch image", { status: 502 });
  }

  if (!res.ok) {
    console.error(
      `Google Drive returned ${res.status} for file ${fileId}: ${res.statusText}`,
    );
    return new NextResponse("Image not found", { status: 404 });
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType =
    res.headers.get("content-type") || detectContentType(buffer);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      // Images are immutable — a Google Drive file ID always returns the
      // same bytes.  Cache for a year at the CDN edge and in the browser;
      // "immutable" tells the browser to skip revalidation entirely.
      "Cache-Control":
        "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}

/** Best-effort content-type detection from magic bytes. */
function detectContentType(buffer: Buffer): string {
  if (buffer.length < 4) return "application/octet-stream";

  // PNG: 89 50 4E 47
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "image/png";
  }
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  // GIF: 47 49 46
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    return "image/gif";
  }
  // WebP: 52 49 46 46 ... 57 45 42 50
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return "image/webp";
  }

  return "application/octet-stream";
}
