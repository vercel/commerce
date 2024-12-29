'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariations } from 'lib/woocomerce/models/product';
import { useMemo } from 'react';
import { useCart } from './cart-context';

function SubmitButton({disabled = false}: {disabled: boolean}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';

  return (
    <button aria-label="Please select an option" disabled={disabled} className={clsx(buttonClasses)}>
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product, variations }: { product: Product, variations?: ProductVariations[] }) {
  const { setNewCart } = useCart();
  const {state} = useProduct();
  

  const productVariant = useMemo(() => {
    const keys = Object.keys(state).filter((key) => key !== 'id' && key !== 'image').map((key) => ({
      attribute: key.toLowerCase(),
      value: state[key]
    }));
    const productExist = variations?.find((variation) => {
      const attributes = variation.attributes.map((attr) => ({name: attr.name, option: attr.option})) || [];
      return attributes.every((attribute) => attribute.option === keys.find((key) => key.attribute === attribute.name)?.value);
    });

    return productExist ? keys : [];
  }, [state, variations]);

  return (
    <form
      action={async () => {
        try {
          const cart = await (
            await fetch('/api/cart', {
              method: 'POST',
              body: JSON.stringify({ id: product.id, quantity: 1, variation: productVariant })
            })
          ).json();
          setNewCart(cart);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <SubmitButton disabled={variations?.length && !productVariant.length ? true : false}/>
    </form>
  );
}
