'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useCart } from './cart-context';
import { addItem } from './actions';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)} data-test="add-to-cart">
        Out Of Stock
      </button>
    );
  }

  // console.log(selectedVariantId);
  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
        data-test="add-to-cart"
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
      data-test="add-to-cart"
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();

  // Trouver le variant correspondant à l'état actuel du produit
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariant = variants.length === 1 ? variants[0] : undefined;
  const selectedVariant = variant || defaultVariant;
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation(); // Assure-toi d'arrêter la propagation des événements

    if (selectedVariant) {
      addCartItem(selectedVariant, product); // Appel avec l'objet ProductVariant

      // Appel côté serveur pour ajouter au panier via Shopify
      try {
        await addItem(null, selectedVariant.id); // Appel côté serveur
      } catch (error) {
        console.error('Error adding item to server cart:', error);
      }
    } else {
      console.error('No variant selected');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariant?.id} // Utilisation de l'ID du variant dans le bouton
      />
    </form>
  );
}
