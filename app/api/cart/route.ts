import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { addToCart, removeFromCart, updateCart } from 'lib/medusa';
import { isMedusaError } from 'lib/type-guards';

function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function POST(req: NextRequest): Promise<Response> {
  const cartId = cookies().get('cartId')?.value;
  const { variantId } = await req.json();

  if (!cartId?.length || !variantId?.length) {
    return NextResponse.json({ error: 'Missing cartId or variantId' }, { status: 400 });
  }
  try {
    await addToCart(cartId, [{ variantId, quantity: 1 }]);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (isMedusaError(e)) {
      return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
    }

    return NextResponse.json({ status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<Response> {
  const cartId = cookies().get('cartId')?.value;
  const { variantId, quantity, lineId } = await req.json();

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
        quantity
      }
    ]);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (isMedusaError(e)) {
      return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
    }

    return NextResponse.json({ status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const cartId = cookies().get('cartId')?.value;
  console.log(req.nextUrl);
  const lineId = req.nextUrl.searchParams.get('lineId');

  if (!cartId || !lineId) {
    return NextResponse.json({ error: 'Missing cartId or lineId' }, { status: 400 });
  }
  try {
    await removeFromCart(cartId, [lineId]);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    if (isMedusaError(e)) {
      return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
    }

    return NextResponse.json({ status: 500 });
  }
}
