import { storeApi } from 'lib/woocomerce/storeApi';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.token) {
      storeApi._setAuthorizationToken(session.user.token);
    } else {
      storeApi._setAuthorizationToken('');
    }
    const cart = await storeApi.getCart();
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, quantity, variation } = await req.json();
    const cart = await storeApi.addToCart({ id, quantity, variation });
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { key, quantity } = await req.json();
    if (quantity > 0) {
      const cart = await storeApi.updateItem({ key, quantity });
      return NextResponse.json(cart, { status: 200 });
    } else {
      const cart = await storeApi.removeFromCart({ key });
      return NextResponse.json(cart, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { key } = await req.json();
    const cart = await storeApi.removeFromCart({ key });
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
}
