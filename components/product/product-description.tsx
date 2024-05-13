import { AddToCart } from 'components/cart/add-to-cart';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import CoreCharge from './core-charge';
import SpecialOffer from './special-offer';
import VariantPrice from './vairant-price';
import { VariantSelector } from './variant-selector';
import Warranty from './warranty';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-5 flex flex-col dark:border-neutral-700">
        <h1 className="text-xl font-bold md:text-2xl">{product.title}</h1>
        <div className="mb-5 flex items-center justify-start gap-x-2">
          <p className="text-sm">SKU: 123456</p>
          <p className="text-sm">Condition: Used</p>
        </div>
        <VariantPrice
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
