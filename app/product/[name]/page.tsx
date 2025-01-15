import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AddToCart } from 'components/cart/add-to-cart';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import { VariantSelector } from 'components/product/variant-selector';
import Prose from 'components/prose';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { isStrinInteger } from 'lib/utils';
import { Image } from 'lib/woocomerce/models/base';
import { Product, ProductVariations } from 'lib/woocomerce/models/product';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import Link from 'next/link';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  let product: Product | undefined = undefined;
  if (isStrinInteger(params.name)) {
    product = await woocommerce.get(`products/${params.name}`);
  } else {
    product = (await woocommerce.get('products', { slug: params.name }))?.[0];
  }

  if (!product) return notFound();

  const indexable = !product.tags.find((tag) => tag.name?.includes(HIDDEN_PRODUCT_TAG));

  return {
    title: product.name,
    description: product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    }
  };
}

async function RelatedProducts({ product }: { product: Product }) {
  const relatedProducts = await Promise.all(
    product.related_ids?.map(async (id) => woocommerce.get(`products/${id}`)) || []
  );

  return (
    <>
      {relatedProducts.length > 0 && (
        <div className="mt-8 py-4">
          <h3 className="text-2xl font-bold">Related Products</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => {
              return (
                <Link
                  key={relatedProduct.id}
                  className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
                  href={`/product/${relatedProduct.slug}`}
                >
                  <img
                    src={relatedProduct.images?.[0].src}
                    alt={relatedProduct.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{relatedProduct.name}</h2>
                    <div dangerouslySetInnerHTML={{ __html: relatedProduct.short_description }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default async function ProductPage(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  let product: Product | undefined = undefined;
  if (isStrinInteger(params.name)) {
    product = await woocommerce.get(`products/${params.name}`);
  } else {
    product = (await woocommerce.get('products', { slug: params.name }))?.[0];
  }
  let variations: ProductVariations[] = [];
  if (product?.variations?.length) {
    variations = await woocommerce.get(`products/${product?.id}/variations`);
  }

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.[0]?.src,
    offers: {
      '@type': 'AggregateOffer',
      availability:
        product.stock_quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceCurrency: product.price,
      highPrice: product.max_price,
      lowPrice: product.min_price
    }
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Partial<Image>) => ({
                  id: image.id!,
                  src: image.src!,
                  altText: image.alt!
                }))}
              />
            </Suspense>
            <div className="mt-4 text-center text-sm">
              {product.description ? (
                <Prose
                  className="mb-6 text-sm leading-tight dark:text-white/[60%]"
                  html={product.description}
                />
              ) : null}
            </div>
          </div>

          <div className="basis-full lg:basis-2/6">
            <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
            {variations && (
              <Suspense fallback={null}>
                <VariantSelector options={product.attributes} variations={variations} />
              </Suspense>
            )}
            <Suspense fallback={null}>
              <ProductDescription product={product} variations={variations} />
            </Suspense>
            <AddToCart product={product} variations={variations} />
          </div>
        </div>
        <Suspense fallback={null}>
          <RelatedProducts product={product} />
        </Suspense>
      </div>
    </ProductProvider>
  );
}
