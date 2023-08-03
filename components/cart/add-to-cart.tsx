'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export function AddToCart({
  availableForSale,
  addToCart,
}: {
  availableForSale: boolean;
  addToCart: any;
}) {
  const { pending } = useFormStatus()

  return (
    <form action={addToCart}>
      <button
        aria-label="Add item to cart"
        disabled={pending}
        type="submit"
        className={clsx(
          'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90',
          {
            'cursor-not-allowed opacity-60': !availableForSale,
            'cursor-not-allowed': pending
          }
        )}
      >
        <div className="absolute left-0 ml-4">
          {!pending ? <PlusIcon className="h-5" /> : <LoadingDots className="mb-3 bg-white" />}
        </div>
        <span>{availableForSale ? 'Add To Cart' : 'Out Of Stock'}</span>
      </button>
    </form>
  );
}
