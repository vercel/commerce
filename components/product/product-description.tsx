import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { DescriptionContent } from './description-content';
import { SustainabilityInfo } from './sustainability-info';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-4xl md:text-3xl font-medium">{product.title}</h1>
        <div className="place-self-end mr-auto w-auto rounded-full bg-gray-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart variants={product.variants} availableForSale={product.availableForSale} />

      <DescriptionContent product={product} />
      <SustainabilityInfo />
    </>
  );
}
