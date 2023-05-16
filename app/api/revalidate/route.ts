import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
 
export async function GET(request: NextRequest) {
  
  console.log(request)
  revalidatePath('/');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}