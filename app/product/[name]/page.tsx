import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AddToCart } from 'components/cart/add-to-cart';
import { Gallery } from 'components/product/gallery';
import { ProductCard } from 'components/product/product-card';
import { ProductProvider } from 'components/product/product-context';
import ProductSpecifications from 'components/product/product-specifications';
import { ProductVariants } from 'components/product/product-variants';
import { VariantSelector } from 'components/product/variant-selector';
import Prose from 'components/prose';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { Image } from 'lib/woocomerce/models/base';
import { Product, ProductVariations } from 'lib/woocomerce/models/product';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { getTranslations } from 'next-intl/server';
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

async function RelatedProducts({ product }: { product: Product }) {
  const t = await getTranslations('ProductPage');
  const relatedProducts = await Promise.all(
    product.related_ids?.map(async (id) => woocommerce.get(`products/${id}`)) || []
  );

  return (
    <>
      {relatedProducts.length > 0 && (
        <div className="mt-8 py-4">
          <h3 className="text-2xl font-bold">{t('relatedProducts')}</h3>
          <div className="mx-auto mt-4 grid max-w-screen-2xl flex-col gap-6 pb-4 md:grid-cols-8">
            {relatedProducts.map((relatedProduct) => {
              return <ProductCard key={relatedProduct.id} product={relatedProduct} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default async function ProductPage(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  const product: Product | undefined = (
    await woocommerce.get('products', { slug: params.name })
  )?.[0];
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
        <div className="grid items-start gap-8 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black md:flex-col-reverse lg:grid-cols-2 lg:flex-row lg:flex-col">
          <h1 className="mb-2 text-5xl font-medium md:hidden lg:hidden">{product.name}</h1>
          <div className="lg:sticky top-4 w-full self-start">
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

          <div className="">
            <h1 className="mb-2 hidden text-5xl font-medium md:block lg:block">{product.name}</h1>
            {variations && (
              <Suspense fallback={null}>
                <VariantSelector options={product.attributes} variations={variations} />
              </Suspense>
            )}
            <div>
              <Suspense fallback={null}>
                <ProductVariants product={product} variations={variations} />
              </Suspense>
              <AddToCart product={product} variations={variations} />
              <div className="mt-4 text-center text-sm">
                {product.short_description ? (
                  <Prose
                    className="mb-6 text-sm leading-tight dark:text-white/[60%]"
                    html={product.short_description}
                  />
                ) : null}
              </div>
              <ProductSpecifications product={product} />
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <RelatedProducts product={product} />
        </Suspense>
      </div>
    </ProductProvider>
  );
}
