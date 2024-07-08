import { Chip } from 'components/ui';
import { Order } from 'lib/shopify/types';

export default function OrderConfirmedStatus({ order }: { order: Order }) {
  if (order.orderConfirmation?.value) return null;

  return <Chip level="error">Order Not Confirmed</Chip>;
}
