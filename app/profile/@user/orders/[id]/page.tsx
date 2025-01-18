import Price from 'components/price';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import Image from 'next/image';

export default async function OrderPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;

  const order = await woocommerce.get('orders', { id: params.id });

  return (
    <section className="mt-4 grid w-full gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">Order</h1>
      <div className="flex flex-col">
        <div className="mt-4">
          <span className="text-lg font-bold">Ordine #{order.number}</span>
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
                <div className="ms-4 flex flex-1 flex-col text-base">
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

        <span className="mt-4 text-lg font-bold">Dettagli</span>
        <span>
          Totale {order.total} {order.currency}
        </span>
        <span>Metodo di pagamento: {order.payment_method}</span>

        <span className="mt-4 text-lg font-bold">Indirizzo di spedizione</span>
        <span>
          {order.shipping.first_name} {order.shipping.last_name}
        </span>
        <span>{order.shipping.address_1}</span>
        <span>
          {order.shipping.city} {order.shipping.state} {order.shipping.postcode}
        </span>
        <span>{order.shipping.country}</span>
      </div>
    </section>
  );
}
