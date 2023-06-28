import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';
import { useCookies } from 'react-cookie';

import clsx from 'clsx';
import MinusIcon from 'components/icons/minus';
import PlusIcon from 'components/icons/plus';
import { removeFromCart, updateCart } from 'lib/medusa';
import type { CartItem } from 'lib/medusa/types';
import LoadingDots from '../loading-dots';

export default function EditItemQuantityButton({
  item,
  type
}: {
  item: CartItem;
  type: 'plus' | 'minus';
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [cookie] = useCookies(['cartId']);

  async function handleEdit() {
    const cartId = cookie.cartId;

    if (!cartId) return;

    setEditing(true);

    const method = type === 'minus' && item.quantity - 1 === 0 ? 'remove' : 'update';

    method === 'update' &&
      (await updateCart(cartId, {
        lineItemId: item.id,
        quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
      }));

    method === 'remove' && (await removeFromCart(cartId, item.id));

    setEditing(false);

    startTransition(() => {
      router.refresh();
    });
  }
  return (
    <button
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      onClick={handleEdit}
      disabled={editing}
      className={clsx(
        'ease flex min-w-[36px] max-w-[36px] items-center justify-center border px-2 transition-all duration-200 hover:border-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900',
        {
          'cursor-not-allowed': isPending,
          'ml-auto': type === 'minus'
        }
      )}
    >
      {isPending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </button>
  );
}
