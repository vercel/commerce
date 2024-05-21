import { AddToCart } from 'components/cart/add-to-cart';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import CoreCharge from './core-charge';
import SpecialOffer from './special-offer';
import VariantDetails from './vairant-details';
import { VariantSelector } from './variant-selector';
import Warranty from './warranty';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-5 flex flex-col dark:border-neutral-700">
        <h1 className="text-xl font-bold md:text-2xl">{product.title}</h1>

        <VariantDetails
          variants={product.variants}
          defaultPrice={product.priceRange.minVariantPrice}
        />
      </div>
      <Suspense fallback={null}>
        <VariantSelector
          options={product.options}
          variants={product.variants}
          minPrice={product.priceRange.minVariantPrice}
        />
      </Suspense>

      {product.descriptionHtml ? (
        <Prose
          className="mb-4 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <div className="mb-2 border-t py-4 dark:border-neutral-700">
        <CoreCharge variants={product.variants} />
      </div>

      <div className="mb-2 border-t py-4 dark:border-neutral-700">
        <Warranty />
      </div>

      <Suspense fallback={null}>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </Suspense>
      <div className="mt-4 border-t pt-4">
        <SpecialOffer />
      </div>
    </>
  );
}
