'use server';

import { authOptions } from 'lib/auth/config';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

export default async function PersonalArea() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations('ProfilePage');
  if (!session?.user?.customer_id) {
    return { status: 401, body: { error: 'User not logged' } };
  }

  const customer = await woocommerce.get('customers', { id: session?.user.customer_id });

  return (
    <section className="mt-4 grid max-w-screen-2xl gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">{t('area')}</h1>
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          First Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          value={customer.first_name}
          disabled
        />
        <label
          htmlFor="last_name"
          className="mt-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          className="mt-1 block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          value={customer.last_name}
          disabled
        />
        <label
          htmlFor="email"
          className="mt-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          value={customer.email}
          disabled
        />
      </div>
    </section>
  );
}
