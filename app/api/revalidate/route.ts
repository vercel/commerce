import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
 
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');

  console.log(request.nextUrl.searchParams)

  revalidatePath(`/${locale}/${slug}`);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}