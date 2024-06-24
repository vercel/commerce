'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import FileInput from 'components/form/file-input';
import Input from 'components/form/input';

type ActivateWarrantyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ActivateWarrantyModal({ onClose, isOpen }: ActivateWarrantyModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed inset-0 z-50 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="w-full max-w-lg bg-white p-5 sm:w-[500px]">
          <DialogTitle className="mb-2 font-bold">Activate Warranty</DialogTitle>
          <form>
            <div className="flex w-full flex-col gap-4">
              <FileInput label="Odometer" name="odometer" />
              <FileInput label="Installation Receipt" name="installation-receipt" />
              <Input label="Customer Mileage" name="customer-mileage" type="number" />
              <Input label="Customer VIN" name="customer-vin" />
            </div>
          </form>
          <div className="mt-4 flex w-full justify-end gap-4">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Activate
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ActivateWarrantyModal;
