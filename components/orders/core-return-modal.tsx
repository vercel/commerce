import { Dialog, DialogBackdrop, DialogPanel, Fieldset, Legend } from '@headlessui/react';
import { Order } from 'lib/shopify/types';
import { Button, Heading, Input } from 'components/ui';
import StatesCombobox from 'components/states-combobox';
import { useTransition } from 'react';
// import { returnCore } from './actions';

export function CoreReturnModal({
  isOpen,
  onClose,
  order
}: {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}) {
  const [submitting, startTransition] = useTransition();

  async function submitCoreReturn(formData: FormData) {
    startTransition(async () => {
      // returnCore(order, formData);
      console.log(formData);
    });
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="bg-black/30 fixed inset-0 duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 w-screen overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full max-w-xl space-y-4 rounded bg-white p-5 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className="flex justify-between">
              <Heading>Core Return</Heading>
              <Heading size="sm" className="text-content">
                Order {order.name}
              </Heading>
            </div>
            <form action={submitCoreReturn} className="flex flex-col gap-4">
              <Fieldset className="grid grid-cols-2 gap-4" disabled={submitting}>
                <Heading as={Legend} size="sm" className="col-span-2">
                  Core Pickup Address
                </Heading>
                <Input name="name" label="Name" required className="col-span-2" />
                <Input
                  defaultValue={order.customer?.emailAddress}
                  label="Email"
                  name="email"
                  type="email"
                  required
                />
                <Input
                  defaultValue={order.shippingAddress.phone}
                  label="Phone"
                  name="phone"
                  type="tel"
                  required
                />
                <Input
                  defaultValue={order.shippingAddress.address1}
                  label="Address"
                  name="address"
                  required
                  className="col-span-2"
                />
                <Input
                  defaultValue={order.shippingAddress.city}
                  label="City"
                  name="city"
                  required
                />
                <Input defaultValue={order.shippingAddress.zip} label="Zip" name="zip" required />
                <StatesCombobox defaultStateCode={order.shippingAddress.provinceCode} />
              </Fieldset>
              <div className="flex justify-end gap-2">
                <Button variant="text" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" variant="solid" disabled={submitting}>
                  Submit
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
