'use client';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product, ProductVariations } from 'lib/woocomerce/models/product';
import { useProduct } from './product-context';

export function ProductDescription({
  product,
  variations
}: {
  product: Product;
  variations?: ProductVariations[];
}) {
  const { state } = useProduct();
  const productVariant = variations?.find(
    (variation) => variation.id.toString() === state.variation
  );

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={productVariant ? productVariant.price : product.price}
            currencyCode="EUR"
          />
        </div>
      </div>
      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}
    </>
  );
}
