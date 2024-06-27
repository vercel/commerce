'use client';

import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import clsx from 'clsx';
import CheckboxField from 'components/form/checkbox-field';
import FileInput from 'components/form/file-input';
import Input from 'components/form/input-field';
import LoadingDots from 'components/loading-dots';
import { ShopifyOrderMetafield } from 'lib/shopify/types';
import { FormEventHandler, useRef, useTransition } from 'react';
import { activateWarranty } from './actions';

type ActivateWarrantyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderMetafields?: ShopifyOrderMetafield;
};

function ActivateWarrantyModal({
  onClose,
  isOpen,
  orderId,
  orderMetafields
}: ActivateWarrantyModalProps) {
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);

    startTransition(async () => {
      await activateWarranty(orderId, formData, orderMetafields);
      form.reset();
      onClose();
    });
  };

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
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex w-full flex-col gap-4">
              <FileInput
                label="Odometer"
                name="warranty_activation_odometer"
                fileId={orderMetafields?.warrantyActivationOdometer?.value}
              />
              <FileInput
                label="Installation Receipt"
                name="warranty_activation_installation"
                fileId={orderMetafields?.warrantyActivationInstallation?.value}
              />
              <CheckboxField
                label="Self Installed"
                name="warranty_activation_self_install"
                defaultChecked={orderMetafields?.warrantyActivationSelfInstall?.value === 'true'}
              />
              <Input
                label="Customer Mileage"
                name="warranty_activation_mileage"
                type="number"
                defaultValue={orderMetafields?.warrantyActivationMileage?.value}
              />
              <Input
                label="Customer VIN"
                name="warranty_activation_vin"
                defaultValue={orderMetafields?.warrantyActivationVIN?.value}
              />
            </div>
            <div className="mt-4 flex w-full justify-end gap-4">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={onClose}
              >
                Cancel
              </button>
              <Button
                type="submit"
                className={clsx(
                  'flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                  { 'cursor-not-allowed opacity-60': pending },
                  { 'cursor-pointer opacity-100': !pending }
                )}
                disabled={pending}
              >
                {pending && <LoadingDots className="bg-white" />}
                Submit
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ActivateWarrantyModal;
