'use client';

import { useState } from 'react';
import ActivateWarrantyModal from './activate-warranty-modal';

type ActivateWarrantyModalProps = {
  orderId: string;
};

const ActivateWarranty = ({ orderId }: ActivateWarrantyModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setIsOpen(true)}
      >
        Activate Warranty
      </button>
      <ActivateWarrantyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ActivateWarranty;
