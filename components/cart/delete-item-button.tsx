'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeItem } from 'components/cart/actions';
import type { CartItem } from 'lib/shopify/types';
import { useFormState } from 'react-dom';

export function DeleteItemButton({
  item,
  optimisticUpdate
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const [message, formAction] = useFormState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null, itemId);

  return (
    <form
      action={async () => {
        optimisticUpdate({ itemId, newQuantity: 0, type: 'minus' });
        await actionWithVariant();
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200"
      >
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
