import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    const { key } = await req.json();
    const response = await utapi.deleteFiles(key);

    if (response.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        success: false,
        error: "Failed to delete file",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
