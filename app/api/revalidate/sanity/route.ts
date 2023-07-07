import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { i18n } from 'i18n-config';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SANITY_WEBHOOK_SECRET = `${process.env.SANITY_WEBHOOK_SECRET}`;

export async function POST(request: NextRequest) {
  // Await the response from our request.
  const requestData = await request.json();
  
  // Get headers.
  const headersList = headers();

  // Get Sanity webhook signature header name.
  const signature = `${headersList.get(SIGNATURE_HEADER_NAME)}`;
  const isValid = isValidSignature(JSON.stringify(requestData), signature, SANITY_WEBHOOK_SECRET);

  // Log out validity of request. 
  console.log(`Webhook request valid? ${isValid}`);

  // If not valid, return.
  if (!isValid) {
    NextResponse.json({ success: false, message: 'Invalid signature' });
    return;
  }

  const slug: string = requestData.slug;
  const type: string = requestData.type;
  const locale: string = requestData.locale;

  if (type === 'home') {
    revalidatePath(`${slug}`)
    console.log(`Revalidated path: ${slug}`);
  } else {
    if (i18n.defaultLocale === locale) {
      revalidatePath(`${slug}`)
      console.log(`Revalidated path: ${slug}`);
    } else {
      revalidatePath(`${locale}${slug}`)
      console.log(`Revalidated path: ${locale}${slug}`);
    }
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}