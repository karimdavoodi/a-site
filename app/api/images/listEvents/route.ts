import { NextResponse } from "next/server";
import { getImageListFromFolder } from "../../../utils/images";

export const runtime = "nodejs";

export async function GET() {
  try {
    const images = await getImageListFromFolder("Events");
    if (!images) {
      return NextResponse.json(
        { error: "Failed to load events — sync error" },
        { status: 500 },
      );
    }

    return NextResponse.json(images, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (err) {
    console.error("Error in /api/images/listEvents:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
