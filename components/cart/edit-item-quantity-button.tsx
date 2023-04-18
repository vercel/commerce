import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

import MinusIcon from 'components/icons/minus';
import PlusIcon from 'components/icons/plus';
import type { CartItem } from 'lib/shopify/types';
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

    const response = await fetch(`/api/cart`, {
      method: type === 'minus' && item.quantity - 1 === 0 ? 'DELETE' : 'PUT',
      body: JSON.stringify({
        lineId: item.id,
        variantId: item.merchandise.id,
        quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
      })
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
      className={`${editing ? 'cursor-not-allowed' : ''} ${
        type === 'minus' ? 'ml-auto' : ''
      } flex h-8 w-8 items-center justify-center border-l border-black/40 bg-black/0 hover:bg-black/10 dark:border-white/40 dark:bg-white/0 dark:hover:bg-white/10`}
    >
      {editing ? (
        <LoadingDots className="bg-white dark:bg-black" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4" />
      ) : (
        <MinusIcon className="h-4" />
      )}
    </button>
  );
}
