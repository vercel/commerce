import { Order } from 'lib/shopify/types';
import CoreReturnStatus from './core-return-status';
import WarrantyActivatedStatus from './warranty-activated-status';
import OrderConfirmedStatus from './order-confirmation-status';

export default function OrderStatuses({ order, className }: { order: Order; className?: string }) {
  return (
    <div className={className}>
      <OrderConfirmedStatus order={order} />
      <CoreReturnStatus order={order} />
      <WarrantyActivatedStatus order={order} />
    </div>
  );
}
