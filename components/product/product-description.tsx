import { AddToCart } from 'components/cart/add-to-cart';
import { Product } from 'lib/shopify/types';
import { DescriptionContent } from './description-content';
import { VariantDetails } from './variant-details';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="mb-2 text-xl sm:text-2xl md:text-3xl font-medium">{product.title}</h1>
      </div>
      <VariantDetails product={product} />
      <AddToCart variants={product.variants} availableForSale={product.availableForSale} />

      <DescriptionContent product={product} />
      {/* {!product.tags.includes('wall') && <SustainabilityInfo />} */}
    </>
  );
}
