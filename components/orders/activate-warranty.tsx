'use client';

import { Order, OrderMetafield, WarrantyStatus } from 'lib/shopify/types';
import { useState } from 'react';
import ActivateWarrantyModal from './activate-warranty-modal';
import WarrantyActivatedBadge from './warranty-activated-badge';

type ActivateWarrantyModalProps = {
  order: Order;
  orderMetafields?: OrderMetafield;
};

const ActivateWarranty = ({ order, orderMetafields }: ActivateWarrantyModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isWarrantyActivated = orderMetafields?.warrantyStatus === WarrantyStatus.Activated;

  if (isWarrantyActivated) {
    return <WarrantyActivatedBadge />;
  }

  return (
    <>
      <button
        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setIsOpen(true)}
      >
        Activate Warranty
      </button>
      <ActivateWarrantyModal isOpen={isOpen} onClose={() => setIsOpen(false)} orderId={order.id} />
    </>
  );
};

export default ActivateWarranty;
