import { authOptions } from 'lib/auth/config';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.store_id) {
      return NextResponse.json({ error: 'User not logged' }, { status: 401 });
    }
    const cart = await woocommerce.get('customers', { id: session?.user.store_id });
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const cart = await woocommerce.post('customers', data);
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}
