import { GridTileImage } from 'components/grid/tile';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { getProductById, getProductRecommendations } from 'lib/shopify';
import { ContentLandingPages, Image, Store } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';

const lookupContentLandingPage = async (contentLandingPageId: string) => {
  const contentLandingPages: ContentLandingPages = {
    ABC: {
      contentLandingPageId: 'ABC',
      content: {
        contentId: 'ABC-123',
        contentUrl: 'https://vercel.com'
      },
      brand: {
        brandId: '123456789',
        companyName: 'Vercel'
      },
      store: {
        domain: 'https://test-app-furie.myshopify.com',
        key: '30f0c9b2ee5c69d6c0de2e7a048eb6b4'
      },
      productId: 'gid://shopify/Product/8587441176812'
    },
    '123': {
      contentLandingPageId: '123',
      content: {
        contentId: '123-ABC',
        contentUrl: 'https://vercel.com'
      },
      brand: {
        brandId: '123456789',
        companyName: 'Vercel'
      },
      store: {
        domain: 'https://test-app-furie.myshopify.com',
        key: '30f0c9b2ee5c69d6c0de2e7a048eb6b4'
      },
      productId: 'gid://shopify/Product/8587440849132'
    }
  };

  const contentLandingPage = contentLandingPages[contentLandingPageId];

  if (!contentLandingPage) {
    throw new Error('Content Landing Page not found');
  }

  const product = await getProductById(contentLandingPage.store, contentLandingPage?.productId);
  return { ...contentLandingPage, product };
};

export default async function Page({ params }: { params: { ContentLandingPage: string } }) {
  const instance = await lookupContentLandingPage(params.ContentLandingPage);

  if (!instance.product) {
    return <div>Product not found</div>;
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: instance.product.title,
    description: instance.product.description,
    image: instance.product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: instance.product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: instance.product.priceRange.minVariantPrice.currencyCode,
      highPrice: instance.product.priceRange.maxVariantPrice.amount,
      lowPrice: instance.product.priceRange.minVariantPrice.amount
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
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={instance.product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={instance.product} />
          </div>
        </div>
        <RelatedProducts id={instance.product.id} store={instance.store} />
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
