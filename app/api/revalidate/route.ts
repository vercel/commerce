import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
 
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '/';

  console.log(request.nextUrl.searchParams)

  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}