import Cart from 'components/cart';
import { AddToCart } from 'components/cart/add-to-cart';
import { BuyNow } from 'components/cart/buy-now';
import OpenCart from 'components/cart/open-cart';
import { GridTileImage } from 'components/grid/tile';
import { getContentLandingPageConfig } from 'lib/aspire';
import { Store } from 'lib/aspire/types';
import { getCart, getProductRecommendations } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

const icon = '/image.png';
const contentReel = '/snowboardLong.mp4';

const CheckoutForm = async ({ product, store }: { product: Product; store: Store }) => {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(store, cartId);
  }

  return (
    <div className="sticky inset-x-0 bottom-0 border-t border-neutral-200 bg-white p-4">
      <div className="flex gap-3">
        <div className="flex min-w-0 grow gap-3">
          <div className="shrink-0">
            <img
              alt=""
              className="size-12 rounded-sm bg-neutral-100 object-contain ring-1 ring-inset ring-black/5"
              src={product.featuredImage?.url}
            />
          </div>
          <div className="min-w-0 grow">
            <div className="truncate text-base/6 font-medium text-black group-hover/link:underline">
              {product.title}
            </div>
            <div className="flex gap-x-1 text-sm/6 text-black">
              <span>{product.variants?.[0]?.price.amount}</span>
              <span className="text-xs/6 line-through opacity-60">
                <span className="sr-only">Compare at:</span>
                {product.variants?.[0]?.compareAtPrice?.amount}
              </span>
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <select
            name="quantity"
            className="grow appearance-none rounded-md border-none bg-transparent px-3 py-2.5 text-center text-inherit text-neutral-700 ring-1 ring-neutral-200 [text-align-last:center] disabled:cursor-not-allowed disabled:opacity-40 data-[arrow]:bg-[url:--bg-down-arrow] data-[arrow]:bg-[length:1.25rem] data-[arrow]:bg-[right_0.5rem_center] data-[arrow]:bg-no-repeat data-[arrow]:pr-8 data-[arrow]:text-left data-[arrow]:[text-align-last:left]"
            data-arrow=""
            defaultValue="1"
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
          <div className="w-1/2">
            <AddToCart
              variants={product.variants}
              availableForSale={product.availableForSale}
              store={store}
            />
          </div>
          <div className="w-1/2">
            <BuyNow
              variants={product.variants}
              availableForSale={product.availableForSale}
              store={store}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

const Banner = ({ store }: { store: Store }) => {
  return (
    <div className="relative">
      <div className="width-full bg-banner-bg text-banner-text relative h-11 shrink-0 overflow-hidden truncate bg-white text-center text-sm/[2.75rem] font-medium tracking-tight text-black md:text-base/[2.75rem]">
        <div className="data-closed:opacity-0 motion-safe:data-enter:data-closed:translate-x-full motion-safe:data-leave:data-closed:-translate-x-full absolute inset-0 truncate px-1 transition duration-1000">
          Free ground shipping on orders over $250
        </div>
      </div>
      <div className="absolute inset-x-0 top-full z-10 flex items-center justify-between gap-x-4 bg-transparent px-4 py-3 text-sm text-white drop-shadow md:text-base">
        <a className="group/link text-white" data-discover="true" href="/591976448466620419">
          <div className="flex items-center gap-2">
            <div className="flex shrink-0 -space-x-3">
              <Image
                src={icon}
                alt={store.name}
                className="inline-block size-8 rounded bg-neutral-100 object-cover"
                width={32}
                height={32}
              />
            </div>
            <span className="group-hover/link:underline">
              <strong className="whitespace-nowrap text-white">{store.name}</strong>
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
};

const ProductPreview = ({ product }: { product: Product }) => {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[40%] flex flex-col items-center justify-end gap-3 bg-gradient-to-t from-black/90 p-4">
      <a className="group/link pointer-events-auto w-full" href="#content">
        <div className="flex w-full items-center gap-2 text-sm text-white transition-colors md:text-base">
          <div className="shrink-0">
            <img
              src={product.featuredImage.url}
              className="size-12 rounded-sm bg-neutral-100 object-contain"
              alt="Shore Thing"
            />
          </div>
          <div className="flex min-w-0 grow flex-col gap-1 px-1">
            <div className="truncate group-hover/link:underline">{product.title}</div>
            <div className="flex flex-wrap items-center justify-between gap-x-2 text-xs">
              <div className="flex gap-x-1">
                <span>From {product.priceRange.minVariantPrice.amount}</span>
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-x-[0.2em]">
                  <span className="flex items-center gap-x-[0.2em]" aria-label="4.4 stars">
                    4.4
                    <svg
                      aria-hidden="true"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <span className="opacity-60" aria-label="34 reviews">
                    (34)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
      <a className="group/link pointer-events-auto w-full" href="#content">
        <div className="flex flex-col items-center gap-1 text-sm font-medium text-white drop-shadow">
          <div className="[@media(hover:none)]:hidden">Scroll down to shop</div>
          <div className="animate-bounce">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="[@media(hover:hover)]:rotate-180"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-4.75a.75.75 0 0 0 1.5 0V8.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 9.74a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="[@media(hover:hover)]:hidden">Swipe up to shop</div>
        </div>
      </a>
    </div>
  );
};

export default async function Page({ params }: { params: { ContentLandingPage: string } }) {
  const config = await getContentLandingPageConfig(params.ContentLandingPage);

  if (!config.product) {
    return <div>Product not found</div>;
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: config.product.title,
    description: config.product.description,
    image: config.product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: config.product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: config.product.priceRange.minVariantPrice.currencyCode,
      highPrice: config.product.priceRange.maxVariantPrice.amount,
      lowPrice: config.product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <Banner store={config.store} />
      <div className="relative flex min-h-0 grow flex-col">
        <div className="relative bg-black">
          <div className="relative">
            <video
              autoPlay={true}
              loop={true}
              playsInline={true}
              muted
              className="aspect-ratio-[9/16] max-h-[calc(100svh-2.75rem)] min-h-[24rem] w-full"
              disablePictureInPicture={true}
              src={contentReel}
            ></video>
          </div>
          <ProductPreview product={config.product} />
          <div className="content">
            <div className="mx-auto max-w-screen-2xl px-4"></div>
          </div>
        </div>
      </div>
      <div className="content bg-white">
        <div className="m-8 py-64 "> Below the fold content...</div>
        <CheckoutForm product={config.product} store={config.store} />
      </div>
    </>
  );
}

async function RelatedProducts({ store, id }: { store: Store; id: string }) {
  const relatedProducts = await getProductRecommendations(store, id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link className="relative h-full w-full" href={`/product/${product.handle}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
