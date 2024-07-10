'use client';
import { Button } from 'components/ui';
import { CoreReturnStatus, Order } from 'lib/shopify/types';
import { useState } from 'react';
import { CoreReturnModal } from './core-return-modal';
import { isBeforeToday } from 'lib/utils';

export function CoreReturn({ order }: { order: Order }) {
  const [isOpen, setIsOpen] = useState(false);
  const isPassDeadline = isBeforeToday(order?.coreReturnDeadline?.value);

  if (order.coreReturnStatus?.value !== CoreReturnStatus.CoreNeeded || isPassDeadline) {
    return null;
  }
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Core Return</Button>
      <CoreReturnModal order={order} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
