// /Users/evanparker/Desktop/The_Jump_Course/projects/ReelHub/reelhub/frontend/src/app/api/search/route.ts

import { NextResponse } from "next/server";
import media from "@/data.json";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const mediaData = media.filter((m) =>
      m.title.toLowerCase().includes(title?.toLowerCase() ?? "")
    );
    return NextResponse.json(mediaData.slice(0, 10));
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
