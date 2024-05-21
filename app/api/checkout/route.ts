import { getCart, stripe } from 'lib/stripe';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const cartId = cookies().get('cartId')?.value;
  const cart = cartId ? await getCart(cartId) : null;

  if (!cart) {
    return NextResponse.json({ message: 'Cart not found.' }, { status: 404 });
  }

  try {
    const origin = process.env.APP_URL;

    const session = await stripe.checkout.sessions.create({
      line_items: cart.lines.map((item) => ({
        price: item.id,
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: err.statusCode });
  }
}
