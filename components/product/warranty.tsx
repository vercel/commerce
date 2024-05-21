'use client';

import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import SideDialog from 'components/side-dialog';
import { useState } from 'react';
import WarrantySelector from './warranty-selector';

const Warranty = () => {
  const [openingDialog, setOpeningDialog] = useState<'included' | 'terms-conditions' | null>(null);

  return (
    <div className="flex flex-col text-xs lg:text-sm">
      <div className="mb-3 flex flex-row items-center space-x-1 divide-x divide-gray-400 leading-none lg:space-x-3">
        <div className="flex flex-row items-center space-x-2 text-base font-medium">
          <ShieldCheckIcon className="h-5 w-5" />
          <span>Warranty</span>
        </div>
        <div className="pl-2">
          <button
            onClick={() => setOpeningDialog('included')}
            className="text-xs text-blue-800 hover:underline lg:text-sm"
          >
            What&apos;s Included
          </button>
          <SideDialog
            title="What's Included"
            onClose={() => setOpeningDialog(null)}
            open={openingDialog === 'included'}
          >
            <p>Warranty Included</p>
          </SideDialog>
        </div>
        <div className="pl-2">
          <button
            onClick={() => setOpeningDialog('terms-conditions')}
            className="text-xs text-blue-800 hover:underline lg:text-sm"
          >
            Terms & Conditions
          </button>
          <SideDialog
            title="Terms & Conditions"
            onClose={() => setOpeningDialog(null)}
            open={openingDialog === 'terms-conditions'}
          >
            <p>Terms & Conditions</p>
          </SideDialog>
        </div>
      </div>
      <WarrantySelector />
    </div>
  );
};

export default Warranty;
