import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescriptionCard({ product }: { product: Product }) {
  return (
    <div className="relative">
      <div className="relative border-black bg-white p-2 lg:absolute lg:-left-6 lg:-top-6 lg:border-2">
        <h1 className="text-3xl font-medium md:text-5xl">{product.title}</h1>
      </div>
      <div className="border-black lg:border-2 lg:p-14">
        <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
          <div className="mx-auto w-auto bg-black p-2 text-lg text-white">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
        </div>
        <VariantSelector options={product.options} variants={product.variants} />

        {product.descriptionHtml ? (
          <Prose
            className="mb-6 font-sans text-sm leading-tight dark:text-white/[60%]"
            html={product.descriptionHtml}
          />
        ) : null}

        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </div>
    </div>
  );
}
