import { getOrderConfirmationContent } from 'lib/shopify';

export async function GET() {
  const data = await getOrderConfirmationContent();

  return Response.json({ ...data });
}
