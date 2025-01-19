'use client';
import Price from 'components/price';
import { Product, ProductVariations } from 'lib/woocomerce/models/product';
import { useProduct } from './product-context';

export function ProductVariants({
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
      <div className="mb-6 flex flex-col pb-6">
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={productVariant ? productVariant.price : product.price}
            currencyCode="EUR"
          />
        </div>
      </div>
    </>
  );
}
