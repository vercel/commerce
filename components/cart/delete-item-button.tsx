import CloseIcon from 'components/icons/close';
import LoadingDots from 'components/loading-dots';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

import type { CartItem } from 'lib/shopify/types';

export default function DeleteItemButton({ item }: { item: CartItem }) {
  const router = useRouter();
  const [removing, setRemoving] = useState(false);

  async function handleRemove() {
    setRemoving(true);

    const response = await fetch(`/api/cart`, {
      method: 'DELETE',
      body: JSON.stringify({
        lineId: item.id
      })
    });
    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    setRemoving(false);

    startTransition(() => {
      router.refresh();
    });
  }
  return (
    <button
      aria-label="Remove cart item"
      onClick={handleRemove}
      disabled={removing}
      className={`${
        removing ? 'cursor-not-allowed' : ''
      } mr-2 flex h-8 w-8 items-center justify-center border border-black/40 bg-black/0 hover:bg-black/10 dark:border-white/40 dark:bg-white/0 dark:hover:bg-white/10`}
    >
      {removing ? (
        <LoadingDots className="bg-white dark:bg-black" />
      ) : (
        <CloseIcon className="hover:text-accent-3 h-6" />
      )}
    </button>
  );
}
