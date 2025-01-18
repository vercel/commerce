'use client';

import { Cog8ToothIcon, CubeIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@nextui-org/react';
import LogoutButton from 'components/button/logout';
import { Customer } from 'lib/woocomerce/models/customer';
import { Shipping } from 'lib/woocomerce/models/shipping';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProfileLayout({ user }: { user: React.ReactNode }) {
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
    <section className="mx-auto mt-4 flex max-w-screen-2xl flex-row gap-4 px-4 pb-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black md:w-1/3">
        {customer && (
          <div>
            <Avatar src={customer.avatar_url} alt="avatar" className="h-24 w-24" />
            <div className="mt-2">
              <span>Ciao </span>
              <span className="text-lg font-bold">{customer.first_name}</span>
            </div>
            <div className="flex-start mt-2 flex">
              <Link href={`/profile`} className="hover:text-indigo-500">
                <button type="button" className="flex flex-row items-center rounded-md py-1">
                  <UserCircleIcon className="me-2 h-4" />
                  Personal area
                </button>
              </Link>
            </div>
            <div className="flex-start mt-2 flex">
              <Link href={`/profile/orders`} className="hover:text-indigo-500">
                <button type="button" className="flex flex-row items-center rounded-md py-1">
                  <CubeIcon className="me-2 h-4" />
                  Orders
                </button>
              </Link>
            </div>
            <div className="flex-start mt-2 flex">
              <Link href={`/profile/preferences`} className="hover:text-indigo-500">
                <button type="button" className="flex flex-row items-center rounded-md py-1">
                  <Cog8ToothIcon className="me-2 h-4" />
                  Preferences
                </button>
              </Link>
            </div>
            <div className="mt-2">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
      <div className="flex rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black md:w-2/3">
        {user}
      </div>
    </section>
  );
}
