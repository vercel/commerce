import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { addToCart, removeFromCart, updateCart } from 'lib/bigcommerce';
import { isVercelCommerceError } from 'lib/type-guards';

function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function POST(req: NextRequest): Promise<Response> {
  const cartId = cookies().get('cartId')?.value;
  const { merchandiseId, isBigCommerceAPI, lineId, productId, quantity, variantId } = await req.json();

  if (!isBigCommerceAPI && (!cartId?.length || !merchandiseId?.length)) {
    return NextResponse.json({ error: 'Missing cartId or variantId' }, { status: 400 });
  } else if (!isBigCommerceAPI && !merchandiseId?.length) {
    return NextResponse.json({ error: 'Missing variantId' }, { status: 400 });
  }

  if (cartId && isBigCommerceAPI && lineId && !variantId || quantity === 0) {
    try {
      await removeFromCart(cartId!, [lineId]);

      return NextResponse.json({ status: 204 });
    } catch (e) {
      if (isVercelCommerceError(e)) {
        return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
      }
  
      return NextResponse.json({ status: 500 });
    }
  }

  try {
    const { id: cartEntityId } = await addToCart(cartId || '', [{ merchandiseId, quantity: 1, productId }]);
    
    if ( isBigCommerceAPI && cartEntityId) {
      const response = NextResponse.json({ status: 204 });

      response.cookies.set('cartId', cartEntityId, {
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });

      return response;
    }

    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (isVercelCommerceError(e)) {
      return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
    }

    return NextResponse.json({ status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<Response> {
  const cartId = cookies().get('cartId')?.value;
  const { variantId, quantity, lineId, productId } = await req.json();

  if (!cartId || !variantId || !quantity || !lineId) {
    return NextResponse.json(
      { error: 'Missing cartId, variantId, lineId, or quantity' },
      { status: 400 }
    );
  }
  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
        productId
      }
    ]);

    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (isVercelCommerceError(e)) {
      return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
    }

    return NextResponse.json({ status: 500 });
  }
}

// NOTE: delete route handler fails
// https://github.com/vercel/next.js/issues/48096
export async function DELETE(req: NextRequest): Promise<Response> {
  const cartId = cookies().get('cartId')?.value;
  const { lineId } = await req.json();

  if (!cartId || !lineId) {
    return NextResponse.json({ error: 'Missing cartId or lineId' }, { status: 400 });
  }
  try {
    await removeFromCart(cartId, [lineId]);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (isVercelCommerceError(e)) {
      return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
    }

    return NextResponse.json({ status: 500 });
  }
}
