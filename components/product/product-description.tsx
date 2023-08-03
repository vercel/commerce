import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
// import { VariantSelector } from './variant-selector';

export function ProductDescription({ product, searchParams }: { product: Product; searchParams: URLSearchParams }) {
  async function addToCart() {
    'use server';

    if (!product.availableForSale) return;

    console.log(product.variants)
    const variant = product.variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === searchParams.get(option.name.toLowerCase())
      )
    );

    const variantId = variant?.id || product.variants[0]!.id

    console.log(variantId)
    // const error = await addItem(variantId);

    // if (error) {
    //   console.error(error);
    //   return;
    // }
  }

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      {/* <VariantSelector options={product.options} variants={product.variants} /> */}

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCart availableForSale={product.availableForSale} addToCart={addToCart} />
    </>
  );
}
