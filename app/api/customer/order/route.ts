import { authOptions } from 'lib/auth/config';
import { getStoreApiFromRequest, OrderPayload } from 'lib/woocomerce/storeApi';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.customer_id) {
      return NextResponse.json({ error: 'User not logged' }, { status: 401 });
    }

    const storeApi = await getStoreApiFromRequest(req);

    const { billing_address, shipping_address, customer_note, payment_method, payment_data } =
      await req.json();
    const order: OrderPayload = {
      shipping_address,
      billing_address: billing_address || shipping_address,
      customer_note,
      payment_method: payment_method || 'bacs', // Ensure payment method is used
      payment_data: payment_data || [] // Ensure payment data is used
    };
    console.log('Creating order', order);
    const result = await storeApi.createOrder(order);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error creating order', error);
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
