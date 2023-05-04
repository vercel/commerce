import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

import clsx from 'clsx';
import MinusIcon from 'components/icons/minus';
import PlusIcon from 'components/icons/plus';
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

  async function handleEdit() {
    setEditing(true);

    const method = type === 'minus' && item.quantity - 1 === 0 ? 'DELETE' : 'PUT';
    const url = method === 'PUT' ? '/api/cart' : `/api/cart?lineItemId=${item.id}`;

    const response = await fetch(url, {
      method,
      body:
        method === 'PUT'
          ? JSON.stringify({
              lineItemId: item.id,
              quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
            })
          : null
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

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
          'cursor-not-allowed': editing,
          'ml-auto': type === 'minus'
        }
      )}
    >
      {editing ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </button>
  );
}
