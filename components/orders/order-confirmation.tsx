'use client';
import { Button } from 'components/ui';
import { Order } from 'lib/shopify/types';
import { useState } from 'react';
import OrderConfirmationModal from './order-confirmation-modal';

export default function OrderConfirmation({ order }: { order: Order }) {
  const [isOpen, setIsOpen] = useState(false);

  if (order.orderConfirmation) return null;
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Confirm Order</Button>
      <OrderConfirmationModal isOpen={isOpen} onClose={() => setIsOpen(false)} order={order} />
    </>
  );
}
