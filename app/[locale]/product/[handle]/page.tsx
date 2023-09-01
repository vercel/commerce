import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import clsx from 'clsx';
import { AddManyToCart } from 'components/cart/add-many-to-cart';
import { GridTileImage } from 'components/grid/tile';
import Label from 'components/label';
import { SupportedLocale } from 'components/layout/navbar/language-control';
import Price from 'components/price';
import { ProductDescription } from 'components/product/product-description';
import { ProductTastingNotes } from 'components/product/tasting-notes';
import { VariantSelector } from 'components/product/variant-selector';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Image as MediaImage, Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

export const runtime = 'edge';
export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { handle: string; locale?: SupportedLocale };
}): Promise<Metadata> {
  const product: Product | undefined = await getProduct({
    handle: params.handle,
    language: params?.locale?.toUpperCase()
  });

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({
  params
}: {
  params: { handle: string; locale?: SupportedLocale };
}) {
  const numberOfOtherImages = 3;
  const product = await getProduct({
    handle: params.handle,
    language: params?.locale?.toUpperCase()
  });

  let otherImages: MediaImage[] = [];
  if (!!product) {
    otherImages = product.images
      .slice(0, numberOfOtherImages + 1) // +1 to account for featured image
      .filter((image) => image?.url !== product.featuredImage?.url);
  }

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
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
      <div className="mx-auto max-w-screen-xl py-24">
        <div className="flex flex-col space-y-12">
          <div className="relative h-full w-full">
            <Image
              src={product.featuredImage?.url}
              alt={product.featuredImage?.altText || product.id}
              height={product.featuredImage.height}
              width={product.featuredImage.width}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col space-y-6 px-6 md:flex-row md:space-x-6 md:space-y-0">
            <div className="md:w-1/2">
              <h1 className="mb-2 font-serif text-[50px] font-bold">{product.title}</h1>
            </div>
            <div className="md:w-1/2">
              <div className="flex flex-col space-y-6">
                <div className="mb-6 flex flex-col border-t border-white/20 pt-6">
                  <div className="font-multilingual mr-auto flex w-auto flex-row items-end space-x-4 text-2xl text-white md:text-4xl">
                    <Price
                      amount={product.priceRange.maxVariantPrice.amount}
                      currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                    />
                    <div className="text-xl">tax incl.</div>
                  </div>
                </div>

                <div className="max-w-sm">
                  <VariantSelector options={product.options} variants={product.variants} />

                  <AddManyToCart
                    quantity={1}
                    variants={product.variants}
                    availableForSale={product.availableForSale}
                  />
                </div>

                <div className="border-b border-white/20 pb-6"></div>

                <ProductDescription product={product} />
              </div>
            </div>
          </div>

          <div className="bg-base p-12 text-dark">
            <ProductTastingNotes product={product} />
          </div>

          {!!product?.galleryIntro?.value && (
            <div className="font-multilingual flex w-full flex-row justify-end whitespace-pre-line">
              <div className="md:w-1/2">{product.galleryIntro.value}</div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {!!otherImages &&
              otherImages?.length > 0 &&
              otherImages.map((image, index) => {
                const isOdd = otherImages.length % 2 != 0;
                const isLast = index === otherImages.length - 1;
                const isOddAndLast = isOdd && isLast;
                return (
                  <div
                    key={image.url}
                    className={clsx(
                      isOddAndLast ? 'col-span-2' : 'col-span-1 aspect-square',
                      'relative h-full w-full bg-gray-900/10'
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText}
                      height={image.height}
                      width={image.width}
                      className="h-full w-full object-cover"
                    />
                  </div>
                );
              })}
          </div>

          {!!product?.lower?.value && (
            <div className="font-multilingual flex w-full flex-row justify-end whitespace-pre-line">
              <div className="md:w-1/2">{product.lower.value}</div>
            </div>
          )}

          <Suspense>
            <RelatedProducts id={product.id} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations({ productId: id });

  if (!relatedProducts.length) return null;

  return (
    <div className="border-t border-white/20 px-6 py-12 md:py-24">
      <h2 className="pb-8 font-japan text-[20px]">other products</h2>
      <ul className="flex w-full gap-12 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="h-full w-full flex-none min-[475px]:w-1/2 min-[475px]:pb-12 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative block h-full w-full transition-opacity duration-150 hover:opacity-90"
              href={`/product/${product.handle}`}
            >
              <div className="relative block aspect-square overflow-hidden">
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
              </div>
              <div className="pt-3">
                <Label
                  title={product.title as string}
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  size={
                    product?.variants?.[0]?.selectedOptions?.find(
                      (option) => option.name === 'Size'
                    )?.value
                  }
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
