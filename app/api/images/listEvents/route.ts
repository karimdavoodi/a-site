import { NextResponse } from "next/server";
import { getImageListFromFolder } from "@/utils/images";

export const runtime = "nodejs";

export async function GET() {

  try {
    const images = await getImageListFromFolder("Events");

    return new NextResponse(JSON.stringify(images), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
