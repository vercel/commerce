import CloseIcon from 'components/icons/close';
import LoadingDots from 'components/loading-dots';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';
import { useCookies } from 'react-cookie';

import clsx from 'clsx';
import { removeFromCart } from 'lib/medusa';
import type { CartItem } from 'lib/medusa/types';

export default function DeleteItemButton({ item }: { item: CartItem }) {
  const router = useRouter();
  const [removing, setRemoving] = useState(false);
  const [cookie] = useCookies(['cartId']);

  async function handleRemove() {
    const cartId = cookie.cartId;

    if (!cartId) return;

    setRemoving(true);

    await removeFromCart(cartId, item.id);

    setRemoving(false);

    startTransition(() => {
      router.refresh();
    });
  }
  return (
    <button
      aria-label="Remove cart item"
      onClick={() => {
        startTransition(async () => {
          const error = await removeItem(item.id);

          if (error) {
            alert(error);
            return;
          }

          router.refresh();
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease flex min-w-[36px] max-w-[36px] items-center justify-center border px-2 transition-all duration-200 hover:border-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900',
        {
          'cursor-not-allowed px-0': isPending
        }
      )}
    >
      {isPending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : (
        <CloseIcon className="hover:text-accent-3 mx-[1px] h-4 w-4" />
      )}
    </button>
  );
}
