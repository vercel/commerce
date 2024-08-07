import { DisclosureSection } from 'components/disclosure-section';
import { Images } from 'components/images';
import { getContentLandingPageConfig } from 'lib/aspire';
import { uniqueShopifyVariantId } from 'lib/uniqueShopifyProductId';
import Head from 'next/head';
import CheckoutForm from './content-checkout';
import ContentFooter from './content-footer';
import ContentHeader from './content-header';
import MoreDetailsLink from './content-product-details-link';
import DiscountTable from './content-product-discount-table';
import ProductHeader from './content-product-header';
import ProductReviews from './content-product-review';
import { VariantSelector } from './content-product-variants';
import { RelatedProducts } from './content-related-products';

export default async function ContentLandingPage({
  contentLandingPage,
  productId,
  variantId
}: {
  contentLandingPage: string;
  productId?: string;
  variantId?: string;
}) {
  const config = await getContentLandingPageConfig(contentLandingPage, productId, variantId);

  if (!config) {
    return <div>Content not found</div>;
  }

  if (!config.product) {
    return <div>Product not found</div>;
  }

  const vId = variantId ? uniqueShopifyVariantId(variantId) : null;
  const pId = config.product.id.split('/').at(-1);
  const currentPath = `/${contentLandingPage}`;
  const currentProductPath = `/${contentLandingPage}/${productId ?? pId}`;

  const productVariant = vId
    ? config.product.variants.find((v) => v.id === vId)
    : config.product.variants[0];

  if (!productVariant) {
    return <div>Product variant not found</div>;
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
      <Head>
        <title>{config.shop?.name}</title>
      </Head>
      <ContentHeader store={config.store} banner={config.banner} shop={config.shop!} />
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
              src={config.content.contentUrl}
            ></video>
          </div>
          <ContentFooter product={config.product} reviews={config.reviews} />
        </div>
        <div className="content bg-white">
          <div className="mx-auto flex max-w-screen-lg flex-col gap-12 px-4 py-6 sm:w-[40rem] lg:w-[64rem]">
            <div className="grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6">
              <div className=" max-w-screen-sm lg:col-span-5 lg:col-start-8">
                <ProductHeader productVariant={productVariant} reviews={config.reviews} />
              </div>
              <div className="lg:col-start-0  lg:col-span-7  lg:col-start-1 lg:row-span-3 lg:row-start-1">
                <Images product={config.product} />
              </div>
              <div className=" flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
                <div className="flex flex-col gap-6">
                  <VariantSelector
                    variants={config.product.variants}
                    selectedVariant={productVariant}
                    currentProductPath={currentProductPath}
                  />
                </div>
                <DiscountTable />
                <MoreDetailsLink shop={config.shop} />
                <div className="gap-2 divide-y empty:hidden">
                  <DisclosureSection title={'Product Details'}>
                    <div className="p-4 font-normal">{config.product.description}</div>
                  </DisclosureSection>
                  <DisclosureSection title={'Technical Specs'}>
                    <div className="p-4 font-normal">
                      <span>
                        Base: Lightning Fast Isosport 7500 Sintered Base Base Glass: Super Pop
                        Triaxial Fiberglass Sidewalls: Premium ABS/TPU Top Glass: Super Pop Triaxial
                        Fiberglass Core Material: Spruce
                      </span>
                    </div>
                  </DisclosureSection>
                  <DisclosureSection title={'Shipping Policy'}>
                    <div className="p-4 font-normal">
                      <p>
                        Shipping is free on purchases over $250. Canada rates are available at
                        checkout. Rest of world is a one time fee of $175 to ship.
                      </p>
                      <p>
                        Your snowboard will process within 1-3 business days of your purchase! Allow
                        4 to 10 business days to receive it. This does not apply to Pre Orders.
                      </p>
                    </div>
                  </DisclosureSection>
                  <DisclosureSection title={'Refund Policy'}>
                    <div className="p-4 font-normal">
                      <p>
                        It is good to note that double checking you ordered the right size before
                        placing your final order helps reduce the amount of return shipments.
                        However, if you do need to make a return you have 45 days to do so. The
                        board needs to be in plastic, new condition to be accepted as a full return.
                        However, once the board has been ridden it is yours to keep as we do not
                        accept returns or exchanges on used boards.
                      </p>
                    </div>
                  </DisclosureSection>
                </div>
              </div>
            </div>
            <div>
              <RelatedProducts
                store={config.store}
                productId={config.product.id}
                currentPath={currentPath}
              />
            </div>
            <div className="mb-28">
              <ProductReviews />
            </div>
          </div>
          <CheckoutForm productVariant={productVariant} store={config.store} />
        </div>
      </div>
    </>
  );
}
