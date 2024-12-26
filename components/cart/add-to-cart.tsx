'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Product } from 'lib/woocomerce/models/product';
import { useCart } from './cart-context';

function SubmitButton({
}: {
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';

  return (
    <button
      aria-label="Please select an option"
      className={clsx(buttonClasses)}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { setNewCart } = useCart();

  return (
    <form
      action={async () => {
        try {
          const cart = await (await fetch('/api/cart', {method: 'POST', body: JSON.stringify({ id: product.id, quantity: 1, variation: [] })},)).json();
          setNewCart(cart);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <SubmitButton />
    </form>
  );
}
