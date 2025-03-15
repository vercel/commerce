import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const tag = body.tag;

    if (!tag) {
      return NextResponse.json(
        { message: "Missing tag param" },
        { status: 400 }
      );
    }

    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
}
