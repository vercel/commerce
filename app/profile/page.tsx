import LogoutButton from 'components/button/logout';
import { authOptions } from 'lib/auth/config';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function LoginPage() {
  const data = await getServerSession(authOptions);
  if (!data?.user) {
    return notFound();
  }

  const customer = await woocommerce.get('customers', { id: data.user.store_id });

  return (
    <section className="mx-auto mt-4 grid max-w-screen-2xl justify-center gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <h2 className="text-2xl font-bold">Info</h2>
      <img src={customer.avatar_url} alt="avatar" className="h-11 w-11" />
      <div className="flex h-screen flex-col">
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
            Name
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
          <h2 className="mt-2 text-2xl font-bold">Shipping info</h2>
          <div className="mt-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={customer.shipping.address_1}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              disabled
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
              id="city"
              value={customer.shipping.city}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              disabled
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
              id="state"
              value={customer.shipping.state}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              disabled
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
              id="postcode"
              value={customer.shipping.postcode}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              disabled
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
              id="country"
              value={customer.shipping.country}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              disabled
            />
          </div>
          <div className="mt-4">
            <Link href={`/profile/orders`}>
              <button type="button" className="w-full rounded-md bg-indigo-500 p-3 text-white">
                Orders
              </button>
            </Link>
          </div>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
      </div>
    </section>
  );
}
