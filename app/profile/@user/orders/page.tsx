import Price from 'components/price';
import { authOptions } from 'lib/auth/config';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function OrdersPage() {
  const data = await getServerSession(authOptions);
  const orders = await woocommerce.get('orders');

  return (
    <section className="mt-4 grid max-w-screen-2xl gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      {orders.map((order) => (
        <Link href={`/profile/orders/${order.id}`} key={order.id} className="flex flex-col">
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
              value={order.order_key}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              disabled
            />
          </div>
          {order.line_items.map((item, i) => (
            <li
              key={i}
              className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
            >
              <div className="relative flex w-full flex-row justify-between px-1 py-4">
                <div className="flex flex-row">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    <Image
                      className="h-full w-full object-cover"
                      width={64}
                      height={64}
                      alt={item.name ?? ''}
                      src={item.image?.src || ''}
                    />
                  </div>
                  <div className="flex flex-1 flex-col text-base">
                    <span className="leading-tight">{item.name}</span>
                  </div>
                </div>
                <div className="flex h-16 flex-col justify-between">
                  <Price
                    className="flex justify-end space-y-2 text-right text-sm"
                    amount={(item.price ?? 0).toString()}
                    currencyCode={order.currency}
                  />
                </div>
              </div>
            </li>
          ))}
          <div className="mt-4">
            <label
              htmlFor="total"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Total
            </label>
            <input
              type="text"
              id="total"
              value={order.total}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
              disabled
            />
          </div>
        </Link>
      ))}
    </section>
  );
}
