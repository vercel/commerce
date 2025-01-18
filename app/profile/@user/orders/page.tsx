import Price from 'components/price';
import { authOptions } from 'lib/auth/config';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function OrdersPage() {
  const data = await getServerSession(authOptions);
  const orders = await woocommerce.get('orders', { customer: data?.user?.store_id });

  return (
    <section className="mt-4 grid w-full gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col rounded border border-neutral-300 p-4 dark:border-neutral-700"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span>ID ORDINE:</span>
              <span className="font-bold">{order.id}</span>
            </div>
            <div className="flex flex-col">
              <span>EFFETTUATO IL:</span>
              <span className="font-bold">{new Date(order.date_created).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mt-4">
            {order.line_items.map((item, i) => (
              <li key={i} className="flex w-full flex-col">
                <Link
                  href={`/product/${item.product_id}`}
                  className="flex w-full flex-row justify-between px-1 py-4"
                >
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
                    <div className="ms-4 flex flex-1 flex-col text-base hover:underline">
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
                </Link>
              </li>
            ))}
          </div>
          <div className="mt-4 flex flex-row-reverse">
            <Link href={`/profile/orders/${order.id}`} className="hover:text-indigo-500">
              Vedi dettagli
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
