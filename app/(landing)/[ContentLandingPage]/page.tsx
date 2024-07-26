import Cart from 'components/cart';
import { AddToCart } from 'components/cart/add-to-cart';
import { BuyNow } from 'components/cart/buy-now';
import OpenCart from 'components/cart/open-cart';
import { DisclosureSection } from 'components/disclosure-section';
import { GridTileImage } from 'components/grid/tile';
import { Images } from 'components/images';
import { getContentLandingPageConfig } from 'lib/aspire';
import { Store } from 'lib/aspire/types';
import { getCart, getProductRecommendations } from 'lib/shopify';
import type { Product, ProductVariant } from 'lib/shopify/types';
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
            <AddToCart
              variants={product.variants}
              availableForSale={product.availableForSale}
              store={store}
            />
          </div>
          <div className="mt-4 w-full md:mt-0 md:w-1/2">
            {/* <ShopPay product={product} store={store} /> */}
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

const ProductHeader = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col gap-2 text-black">
      <h1 className="text-2xl font-bold">{product?.title}</h1>
      <div className="flex items-center">
        <div className="flex grow items-center gap-x-2">
          <span className="text-lg font-bold">{product?.variants[0]?.price.amount}</span>
          <span className="line-through opacity-60">
            <span className="sr-only">Compare at:</span>
            {product?.variants[0]?.compareAtPrice?.amount}
          </span>
        </div>
        <div className="shrink-0 text-sm">
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
  );
};

const VariantSelector = ({ variants }: { variants: ProductVariant[] }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="truncate text-base text-black">
        <span className="font-semibold">Color</span>: {variants?.[0]?.title}
      </div>
      <div className="-mx-1 flex flex-row flex-wrap gap-1">
        {variants.map((variant) => (
          <a
            key={variant.id}
            className="size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400"
            style={{
              backgroundImage: `url(${variant.image?.url})`
            }}
            data-discover="true"
            href={`/ABD?variant=${variant.id}`}
          >
            <div className="sr-only">Deep Blue Stripe</div>
          </a>
        ))}
        {/* <a
          className="size-11 rounded-full border-2 border-neutral-900 bg-white bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-40"
          style={{
            backgroundImage:
              'url(https://cdn.accentuate.io/47890787598611/11944981069876/NavyStripe-v1704751082540.jpeg?200x200)'
          }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzYzMTM3OQ=="
        >
          <div className="sr-only">Deep Blue Stripe</div>
        </a>
        <a
          className="size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          style={{ backgroundColor: 'rgb(31, 49, 98)' }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzQzNDc3MQ=="
        >
          <div className="sr-only">Ocean Navy</div>
        </a>
        <a
          className="size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          style={{
            backgroundImage:
              'url(https://cdn.accentuate.io/47890788122899/11944981069876/rosestripe-v1704751102457.jpeg?200x200)'
          }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4ODE1NTY2Nw=="
        >
          <div className="sr-only">Rosé Pink Stripe</div>
        </a>
        <a
          className="size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          style={{ backgroundColor: 'rgb(244, 204, 204)' }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4Nzk1OTA1OQ=="
        >
          <div className="sr-only">Rosé Pink</div>
        </a>
        <a
          className="size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          style={{
            backgroundImage:
              'url(https://cdn.accentuate.io/47890787074323/11944981069876/skybluestripe-v1704750996500.jpeg?200x200)'
          }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzM2OTIzNQ=="
        >
          <div className="sr-only">Sky Blue Stripe</div>
        </a>
        <a
          className="size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          style={{ backgroundColor: 'rgb(161, 241, 239)' }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzMwMzY5OQ=="
        >
          <div className="sr-only">Sky Blue</div>
        </a>
        <a
          className="size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          style={{
            backgroundImage:
              'url(https://cdn.accentuate.io/47890787074323/11944981069876/Sunshinestripe-v1704737986517.jpg?200x200)'
          }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzEwNzA5MQ=="
        >
          <div className="sr-only">Sunshine Yellow Stripe</div>
        </a>
        <a
          className="aria-disabled:pointer-events:none size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:opacity-40"
          style={{ backgroundColor: 'rgb(250, 191, 65)' }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzA0MTU1NQ=="
        >
          <div className="sr-only">Creamsicle</div>
        </a>
        <a
          className="aria-disabled:pointer-events:none size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:opacity-40"
          style={{ backgroundColor: '#f5f5f5' }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzIzODE2Mw=="
        >
          <div className="sr-only">Seashell White</div>
        </a>
        <a
          className="aria-disabled:pointer-events:none size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:opacity-40"
          style={{
            backgroundImage:
              'url(https://cdn.accentuate.io/47890787533075/11944981069876/GreyStripe-v1704751047442.jpeg?200x200)'
          }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzU2NTg0Mw=="
        >
          <div className="sr-only">Oyster Gray Stripe</div>
        </a>
        <a
          className="aria-disabled:pointer-events:none size-11 rounded-full border-2 border-transparent bg-neutral-200 bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:opacity-40"
          style={{ backgroundColor: 'rgb(191, 191, 191)' }}
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzUwMDMwNw=="
        >
          <div className="sr-only">Oyster Gray</div>
        </a> */}
      </div>
    </div>
  );
};

const BundleSelector = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="max-w-[400px] truncate text-base text-black">
        <span className="font-semibold">Bundle</span>: The Shore Thing Chair with Sun Shade and
        Drink Holder
      </div>
      <div className="-mx-1 flex flex-wrap gap-1">
        <a
          className="flex min-w-11 justify-center rounded-lg border-2 border-transparent bg-neutral-200 bg-clip-content p-0.5 text-sm text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzU5ODYxMQ=="
        >
          <div className="rounded p-2">The Shore Thing Chair</div>
        </a>
        <a
          className="flex min-w-11 justify-center rounded-lg border-2 border-neutral-900 bg-white bg-clip-content p-0.5 text-sm text-neutral-700 transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-40"
          data-discover="true"
          href="/591976448466620419?v=Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzYzMTM3OQ=="
        >
          <div className="rounded p-2">The Shore Thing Chair with Sun Shade and Drink Holder</div>
        </a>
      </div>
    </div>
  );
};

const DiscountTable = () => {
  return (
    <div className="prose mb-4 rounded-xl border border-neutral-200 p-4 text-sm/relaxed shadow-xl">
      <h2 className="mt-0 text-base font-semibold">Buy more and save!</h2>
      <table className="text-left">
        <caption className="mt-4 caption-bottom text-left text-xs">
          Discount applied at checkout.
        </caption>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-[1px] border-b-neutral-200">
            <td>Any 2+ chairs</td>
            <td>
              <strong>10% off</strong>
            </td>
          </tr>
          <tr className="border-b-[1px] border-b-neutral-200">
            <td>Any 4+ chairs</td>
            <td>
              <strong>15% off</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Info = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="prose text-sm/relaxed">
        The Shore Thing Chair introduced in 2024 is the lightest and simplest version of our chairs.
        It features our iconic patented design, premium materials, and in vibrant colors and
        patterns.
      </div>
      <a
        rel="noopener"
        target="_blank"
        href="https://getsunflow.com/products/the-shore-thing-chair"
        className="group/link inline-flex items-center gap-x-1 text-neutral-700"
      >
        <span className="underline decoration-neutral-700/50 decoration-2 underline-offset-4 group-hover/link:decoration-neutral-700">
          More details on SUNFLOW
        </span>
        <svg aria-hidden="true" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
            clipRule="evenodd"
          />
        </svg>
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
        </div>
        <div className="content bg-white">
          <div className="mx-auto flex max-w-screen-lg flex-col gap-12 px-4 py-6 sm:w-[40rem] lg:w-[64rem]">
            <div className="grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6">
              <div className=" max-w-screen-sm lg:col-span-5 lg:col-start-8">
                <ProductHeader product={config.product} />
              </div>
              <div className="lg:col-start-0  lg:col-span-7  lg:col-start-1 lg:row-span-3 lg:row-start-1">
                <Images product={config.product} />
              </div>
              <div className=" flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
                <div className="flex flex-col gap-6">
                  <VariantSelector variants={config.product.variants} />
                  <BundleSelector />
                </div>
                <DiscountTable />

                <Info />
                <div className="gap-2 divide-y empty:hidden">
                  <DisclosureSection title={'Product Details'}>
                    <div>
                      <p>
                        The Shore Thing Chair introduces a simplified version of our original
                        SUNFLOW chair and features our iconic patented design, premium materials,
                        vibrant colors and patterns.&nbsp;
                      </p>
                      <ul>
                        <li>Rust resistant, powder coated, ultimate strength, aluminum frame</li>
                        <li>
                          Made from Greenguard Gold Certified Water Resistant Marine Fabrics 70% PVC
                          / 30% Poly
                        </li>
                        <li>
                          Features:&nbsp;
                          <ul>
                            <li>Patented iconic design</li>
                            <li>Reclines to 3 positions</li>
                            <li>Arm rests for comfort</li>
                            <li>Simple to carry, open and close</li>
                            <li>Backpack straps</li>
                            <li>Limited lifetime warranty for manufacturing defects&nbsp;</li>
                          </ul>
                        </li>
                        <li>Imported</li>
                      </ul>
                    </div>
                  </DisclosureSection>
                  <DisclosureSection title={'Technical Specs'}>
                    <div></div>
                  </DisclosureSection>
                  <DisclosureSection title={'Shipping Policy'}>
                    <div></div>
                  </DisclosureSection>
                  <DisclosureSection title={'Refund Policy'}>
                    <div></div>
                  </DisclosureSection>
                </div>
              </div>
            </div>
          </div>
          <div className="m-8 py-64 "> Below the fold content...</div>
          <CheckoutForm product={config.product} store={config.store} />
        </div>
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
