import { Chip } from 'components/ui';
import { Order } from 'lib/shopify/types';

export default function CoreReturnStatus({ order }: { order: Order }) {
  if (!order.coreReturnStatus?.value) return null;

  return <Chip level="warn">Core Return: {order.coreReturnStatus.value}</Chip>;
}
