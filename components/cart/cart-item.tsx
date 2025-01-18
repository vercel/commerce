import Price from 'components/price';
import type { CartItem } from 'lib/woocomerce/models/cart';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';

export default function CartItemView({
  item,
  quantity = 1,
  deletable = false,
  editable = false,
  closeCart = () => {}
}: {
  item: CartItem;
  quantity?: number;
  deletable?: boolean;
  editable?: boolean;
  closeCart?: () => void;
}) {
  return (
    <div className="relative flex w-full flex-row justify-between px-1 py-4">
      {deletable && (
        <div className="absolute z-40 -ml-1 -mt-2">
          <DeleteItemButton item={item} />
        </div>
      )}
      <div className="flex flex-row">
        <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
          <Image
            className="h-full w-full object-cover"
            width={64}
            height={64}
            alt={item.name}
            src={item.images?.[0]?.src || ''}
          />
        </div>
        <Link href={''} onClick={closeCart} className="z-30 ml-2 flex flex-row space-x-4">
          <div className="flex flex-1 flex-col text-base">
            <span className="leading-tight">{item.name}</span>
            {item.variation.map((variation, i) => (
              <span key={i} className="text-sm text-neutral-500 dark:text-neutral-400">
                {variation.attribute}: {variation.value}
              </span>
            ))}
          </div>
        </Link>
      </div>
      <div className="flex h-16 flex-col justify-between">
        {item.quantity > 1 && (
          <span className="w-full text-sm">
            <span className="w-full text-sm">x{item.quantity}</span>
          </span>
        )}
        <Price
          className="flex justify-end space-y-2 text-right text-sm"
          amount={item.prices?.price}
          needSplit
          currencyCode={item.prices.currency_code}
        />
        {editable && (
          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
            <EditItemQuantityButton item={item} type="minus" />
            <p className="w-6 text-center">
              <span className="w-full text-sm">{item.quantity}</span>
            </p>
            <EditItemQuantityButton item={item} type="plus" />
          </div>
        )}
      </div>
    </div>
  );
}
