import { AddToCart } from 'components/cart/add-to-cart';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import CoreCharge from './core-charge';
import Delivery from './delivery';
import PriceSummary from './price-summary';
import ProductDetails from './product-details';
import SpecialOffer from './special-offer';
import VariantDetails from './vairant-details';
import { VariantSelector } from './variant-selector';
import Warranty from './warranty';

export function ProductDescription({ product }: { product: Product }) {
  const { STORE_PREFIX, SITE_NAME } = process.env;

  return (
    <>
      <div className="mb-4 flex flex-col">
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

      <ProductDetails product={product} />
      <div className="mb-2 border-t py-4 dark:border-neutral-700">
        <CoreCharge variants={product.variants} />
      </div>

      <div className="mb-2 border-t py-4 dark:border-neutral-700">
        <Warranty />
      </div>

      <div className="mb-2 border-t py-4 dark:border-neutral-700">
        <Delivery storePrefix={STORE_PREFIX} siteName={SITE_NAME} />
      </div>

      <PriceSummary
        variants={product.variants}
        defaultPrice={product.priceRange.minVariantPrice}
        storePrefix={STORE_PREFIX}
      />
      <Suspense fallback={null}>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </Suspense>
      <SpecialOffer />
    </>
  );
}
