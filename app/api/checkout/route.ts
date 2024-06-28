import { ajax } from 'lib/cms/ajax';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return NextResponse.json({ message: 'Cart not found.' }, { status: 404 });
  }

  try {
    const session = await ajax<any>('POST', `${process.env.CMS_URL}/api/carts/${cartId}/checkout`, {
      url: process.env.APP_URL
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: err.statusCode });
  }
}
