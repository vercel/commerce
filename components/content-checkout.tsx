import { Store } from 'lib/aspire/types';
import { getCart } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { uniqueShopifyVariantId } from 'lib/uniqueShopifyProductId';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { AddToCart } from './cart/add-to-cart';
import { BuyNow } from './cart/buy-now';

export default async function CheckoutForm({
  product,
  store,
  variantId
}: {
  product: Product;
  store: Store;
  variantId?: string;
}) {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(store, cartId);
  }

  const vId = variantId ? uniqueShopifyVariantId(variantId) : null;

  const selectedVariant = vId ? product.variants.find((v) => v.id === vId) : product.variants[0];

  if (!selectedVariant) {
    return null;
  }

  return (
    <div className="sticky inset-x-0 bottom-0 border-t border-neutral-200 bg-white p-4">
      <div className="flex gap-3">
        <div className="flex min-w-0 grow gap-3">
          <div className="shrink-0">
            <img
              alt=""
              className="size-12 rounded-sm bg-neutral-100 object-contain ring-1 ring-inset ring-black/5"
              src={selectedVariant?.image.url}
            />
          </div>
          <div className="min-w-0 grow">
            <div className="truncate text-base/6 font-medium text-black group-hover/link:underline">
              {selectedVariant?.title}
            </div>
            <div className="flex gap-x-1 text-sm/6 text-black">
              <span>{selectedVariant?.price.amount}</span>
              <span className="text-xs/6 line-through opacity-60">
                <span className="sr-only">Compare at:</span>
                {selectedVariant?.compareAtPrice?.amount}
              </span>
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <select
            id="large"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-3 text-base text-gray-900"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 block gap-2 md:flex">
        <Suspense fallback={null}>
          <div className="w-full md:w-1/2">
            <AddToCart variant={selectedVariant} store={store} />
          </div>
          <div className="mt-4 w-full md:mt-0 md:w-1/2">
            <BuyNow variant={selectedVariant} store={store} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
