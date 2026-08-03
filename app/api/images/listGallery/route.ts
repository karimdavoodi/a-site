import { NextResponse } from "next/server";
import { getImageListFromFolder } from "../../../utils/images";

export const runtime = "nodejs";

export async function GET() {
  try {
    const images = await getImageListFromFolder("Gallery");
    console.log('List galery: ',images?.map(m => m.name));
    if (!images) {
      return NextResponse.json(
        { error: "Failed to load gallery — sync error" },
        { status: 500 },
      );
    }

    return NextResponse.json(images, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (err) {
    console.error("Error in /api/images/listGallery:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
