import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { Image } from 'lib/woocomerce/models/base';
import { Product } from 'lib/woocomerce/models/product';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product: Product | undefined = (
    await woocommerce.get('products', { slug: params.name })
  )?.[0];

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

export default async function ProductPage(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  const product: Product | undefined = (
    await woocommerce.get('products', { slug: params.name })
  )?.[0];

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
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
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
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </ProductProvider>
  );
}
