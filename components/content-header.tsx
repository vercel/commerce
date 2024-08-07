import { Store } from 'lib/aspire/types';
import { ShopifyShop } from 'lib/shopify/types';
import Image from 'next/image';
import { Suspense } from 'react';
import Cart from './cart';
import OpenCart from './cart/open-cart';

export default function ContentHeader({
  store,
  banner,
  shop
}: {
  store: Store;
  banner?: string;
  shop: ShopifyShop;
}) {
  return (
    <div className="relative">
      {banner && (
        <div className="width-full bg-banner-bg text-banner-text relative h-11 shrink-0 overflow-hidden truncate bg-white text-center text-sm/[2.75rem] font-medium tracking-tight text-black md:text-base/[2.75rem]">
          <div className="data-closed:opacity-0 motion-safe:data-enter:data-closed:translate-x-full motion-safe:data-leave:data-closed:-translate-x-full absolute inset-0 truncate px-1 transition duration-1000">
            {banner}
          </div>
        </div>
      )}
      <div className="absolute inset-x-0 top-full z-10 flex items-center justify-between gap-x-4 bg-transparent px-4 py-3 text-sm text-white drop-shadow md:text-base">
        <a className="group/link text-white" data-discover="true" href="/591976448466620419">
          <div className="flex items-center gap-2">
            <div className="flex shrink-0 -space-x-3">
              <Image
                src={shop.brand.logo?.image?.url}
                alt={shop.brand.logo?.image?.altText}
                className="inline-block size-8 rounded bg-neutral-100 object-cover"
                width={32}
                height={32}
              />
            </div>
            <span className="group-hover/link:underline">
              <strong className="whitespace-nowrap text-white">{shop.name}</strong>
            </span>
          </div>
        </a>
        <a className="group/link text-white" data-discover="true">
          <Suspense fallback={<OpenCart />}>
            <Cart store={store} />
          </Suspense>
        </a>
      </div>
    </div>
  );
}
