'use client';

import { useCart } from 'components/cart/cart-context';
import CartItemView from 'components/cart/cart-item';
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
  const handleChangeShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      shipping_address: { ...prev.shipping_address, [e.target.name]: e.target.value }
    }));
  };

  const handleChangeBilling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      billing_address: { ...prev.billing_address, [e.target.name]: e.target.value }
    }));
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

          <h2 className="mt-2 text-2xl font-bold">Shipping info</h2>
          <form className="gap-4 md:grid-cols-6 md:grid-rows-2">
            <div className="mt-4">
              <label
                htmlFor="address_1"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Address
              </label>
              <input
                type="text"
                name="address_1"
                value={formData.shipping_address.address_1}
                onChange={handleChangeShipping}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.shipping_address.city}
                onChange={handleChangeShipping}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.shipping_address.state}
                onChange={handleChangeShipping}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="postcode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Postcode
              </label>
              <input
                type="text"
                name="postcode"
                value={formData.shipping_address.postcode}
                onChange={handleChangeShipping}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.shipping_address.country}
                onChange={handleChangeShipping}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="col-span-4 row-span-2 h-full rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
        <div className="flex flex-col justify-between overflow-hidden p-1">
          <form className="flex flex-col gap-4">
            <h2 className="mt-2 text-2xl font-bold">Billing info</h2>
            <div className="mt-4">
              <label
                htmlFor="address_1"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Address
              </label>
              <input
                type="text"
                name="address_1"
                value={formData.billing_address.address_1}
                onChange={handleChangeBilling}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.billing_address.city}
                onChange={handleChangeBilling}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.billing_address.state}
                onChange={handleChangeBilling}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="postcode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Postcode
              </label>
              <input
                type="text"
                name="postcode"
                value={formData.billing_address.postcode}
                onChange={handleChangeBilling}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.billing_address.country}
                onChange={handleChangeBilling}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="col-span-4 row-span-2 h-full rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
        <div className="flex flex-col justify-between overflow-hidden p-1">
          <h2 className="mt-2 text-2xl font-bold">Payment</h2>
        </div>
      </div>
    </section>
  );
}
