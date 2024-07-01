'use client';
import { Button } from 'components/ui';
import { Order } from 'lib/shopify/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const OrderConfirmationModal = dynamic(() => import('./order-confirmation-modal'));

export default function OrderConfirmation({ order }: { order: Order }) {
  const [isOpen, setIsOpen] = useState(false);

  if (order.orderConfirmation) return null;
  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Confirm Order
      </Button>

      {isOpen && (
        <OrderConfirmationModal isOpen={isOpen} onClose={() => setIsOpen(false)} order={order} />
      )}
    </>
  );
}
