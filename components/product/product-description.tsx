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
        <h1 className="mb-3 text-2xl font-bold">{product.title}</h1>
        <VariantPrice
          variants={product.variants}
          defaultPrice={product.priceRange.minVariantPrice}
        />
      </div>
      <Suspense fallback={null}>
        <VariantSelector options={product.options} variants={product.variants} />
      </Suspense>

      {product.descriptionHtml ? (
        <Prose
          className="mb-4 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <div className="mb-4 border-t pb-4 pt-6 dark:border-neutral-700">
        <CoreCharge variants={product.variants} defaultPrice={product.priceRange.minVariantPrice} />
      </div>

      <div className="mb-4 border-t py-6 dark:border-neutral-700">
        <Warranty productType={product.productType} />
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
