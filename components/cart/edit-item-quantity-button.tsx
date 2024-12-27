'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { CartItem } from 'lib/woocomerce/models/cart';
import { useCart } from './cart-context';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  return (
    <button
      type="submit"
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus'
        }
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({ item, type }: { item: CartItem; type: 'plus' | 'minus' }) {
  const { setNewCart } = useCart();
  const payload = {
    key: item.key,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };

  return (
    <form
      action={async () => {
        try {
          const cart = await (
            await fetch('/api/cart', { method: 'PUT', body: JSON.stringify(payload) })
          ).json();
          setNewCart(cart);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <SubmitButton type={type} />
    </form>
  );
}
