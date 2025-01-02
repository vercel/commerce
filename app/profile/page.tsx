'use client';

import LogoutButton from 'components/button/logout';
import ShippingForm from 'components/shipping/form';
import { Customer } from 'lib/woocomerce/models/customer';
import { Shipping } from 'lib/woocomerce/models/shipping';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [shippingAddress, setShippingAddress] = useState<Shipping | undefined>(undefined);

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = (await (
        await fetch('/api/customer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      ).json()) as Customer;
      setCustomer(data);
    };

    fetchCustomer();
  }, []);

  return (
    <section className="mx-auto mt-4 grid max-w-screen-2xl gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black">
        <h2 className="text-2xl font-bold">Info</h2>
        {customer && (
          <div>
            <img src={customer.avatar_url} alt="avatar" className="h-11 w-11" />
            <div className="flex flex-col">
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={customer.first_name}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  disabled
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Cognome
                </label>
                <input
                  type="text"
                  id="lastname"
                  value={customer.last_name}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  disabled
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={customer.email}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  disabled
                />

                <ShippingForm title="Shipping Info" handleChangeAction={setShippingAddress} />

                <div className="mt-4">
                  <Link href={`/profile/orders`}>
                    <button
                      type="button"
                      className="w-full rounded-md bg-indigo-500 p-3 text-white"
                    >
                      Orders
                    </button>
                  </Link>
                </div>
                <div className="mt-4">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
