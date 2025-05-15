import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Product } from 'lib/shopify/types';

export function AddToCartSkeleton({ product }: { product: Product }) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!product.availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  return (
    <button
      aria-label="Please select an option"
      disabled
      className={clsx(buttonClasses, disabledClasses)}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}
