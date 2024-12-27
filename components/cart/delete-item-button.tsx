'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { CartItem } from 'lib/woocomerce/models/cart';
import { useCart } from './cart-context';

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { setNewCart } = useCart();

  return (
    <form
      action={async () => {
        try {
          const cart = await (
            await fetch('/api/cart', { method: 'DELETE', body: JSON.stringify({ key: item.key }) })
          ).json();
          setNewCart(cart);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
    </form>
  );
}
