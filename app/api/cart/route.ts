import { getStoreApiFromRequest } from 'lib/woocomerce/storeApi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const storeApi = await getStoreApiFromRequest(req);
    const { cart, cartToken: updatedToken } = await storeApi.getCart();

    const response = NextResponse.json(cart);

    if (updatedToken) {
      response.cookies.set('cart-token', updatedToken, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/', //
        maxAge: 60 * 60 * 46 // 46 ore
      });
    }

    return response;
  } catch (error: any) {
    if (error.message.includes('jwt_auth_invalid_token')) {
      console.error('Token expired, please reauthenticate.');
      return NextResponse.json({ error: 'Token expired, please reauthenticate.' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch cart', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const storeApi = await getStoreApiFromRequest(req);
    const { id, quantity, variation } = await req.json();
    const cart = await storeApi.addToCart({ id, quantity, variation });
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to add item to cart',
        message: JSON.stringify(error)
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const storeApi = await getStoreApiFromRequest(req);
    const { key, quantity } = await req.json();
    if (quantity > 0) {
      const cart = await storeApi.updateItem({ key, quantity });
      return NextResponse.json(cart, { status: 200 });
    } else {
      const cart = await storeApi.removeFromCart({ key });
      return NextResponse.json(cart, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart item', message: JSON.stringify(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const storeApi = await getStoreApiFromRequest(req);
    const { key } = await req.json();
    const cart = await storeApi.removeFromCart({ key });
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove item from cart', message: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
