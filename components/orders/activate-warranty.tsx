'use client';

import { Order, ShopifyOrderMetafield, WarrantyStatus } from 'lib/shopify/types';
import { isBeforeToday } from 'lib/utils';
import { useState } from 'react';
import ActivateWarrantyModal from './activate-warranty-modal';
import WarrantyActivatedBadge from './warranty-activated-badge';

type ActivateWarrantyModalProps = {
  order: Order;
  orderMetafields?: ShopifyOrderMetafield;
};

const ActivateWarranty = ({ order, orderMetafields }: ActivateWarrantyModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isWarrantyActivated = orderMetafields?.warrantyStatus?.value === WarrantyStatus.Activated;
  const isPassDeadline = isBeforeToday(orderMetafields?.warrantyActivationDeadline?.value);

  if (isWarrantyActivated) {
    return <WarrantyActivatedBadge />;
  }

  if (isPassDeadline) {
    return null;
  }

  return (
    <>
      <button
        className="flex h-fit items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setIsOpen(true)}
      >
        Activate Warranty
      </button>
      <ActivateWarrantyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        orderId={order.id}
        orderMetafields={orderMetafields}
      />
    </>
  );
};

export default ActivateWarranty;
