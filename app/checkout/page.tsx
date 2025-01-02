'use client';

import { useCart } from 'components/cart/cart-context';
import CartItemView from 'components/cart/cart-item';
import ShippingForm from 'components/shipping/form';
import { OrderPayload } from 'lib/woocomerce/storeApi';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart } = useCart();

  const initialState: OrderPayload = {
    shipping_address: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: ''
    },
    billing_address: {
      first_name: '',
      last_name: '',
      company: '',
      email: '',
      phone: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: ''
    },
    payment_method: '',
    payment_data: []
  };
  const [formData, setFormData] = useState(initialState);
  const handleChangeShipping = (e: any) => {
    setFormData(e);
  };

  const handleChangeBilling = (e: any) => {
    setFormData(e);
  };

  return (
    <section className="mx-auto grid h-full gap-4 px-4 pb-4">
      <div className="col-span-4 row-span-2 h-full rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
        <p>Checkout</p>
        <div className="flex flex-col justify-between overflow-hidden p-1">
          <ul className="flex-grow overflow-auto py-4">
            {cart &&
              cart.items?.length &&
              cart.items
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item, i) => {
                  return (
                    <li
                      key={i}
                      className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                    >
                      <CartItemView item={item} />
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>

      <div className="col-span-4 row-span-2 h-full rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
        <ShippingForm title="Shippping Info" handleChangeAction={handleChangeShipping} />
      </div>

      <div className="col-span-4 row-span-2 h-full rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
        <ShippingForm title="Billing Info" handleChangeAction={handleChangeBilling} />
      </div>

      <div className="col-span-4 row-span-2 h-full rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
        <div className="flex flex-col justify-between overflow-hidden p-1">
          <h2 className="mt-2 text-2xl font-bold">Payment</h2>
        </div>
      </div>
    </section>
  );
}
