import { PaymentGateways } from 'lib/woocomerce/models/payment';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const payments = await woocommerce
      .get('payment_gateways')
      .then((gateways) => gateways.filter((gateway: PaymentGateways) => gateway.enabled));
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
