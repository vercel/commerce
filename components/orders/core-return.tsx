'use client';
import { Button } from 'components/ui';
import { Order } from 'lib/shopify/types';
import { useState } from 'react';
import { CoreReturnModal } from './core-return-modal';

export function CoreReturn({ order }: { order: Order }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Core Return</Button>
      <CoreReturnModal order={order} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
