import { DisclosureSection } from 'components/disclosure-section';
import { Images } from 'components/images';
import { getContentLandingPageConfig } from 'lib/aspire';
import CheckoutForm from './content-checkout';
import ContentFooter from './content-footer';
import ContentHeader from './content-header';
import MoreDetailsLink from './content-product-details-link';
import DiscountTable from './content-product-discount-table';
import ProductHeader from './content-product-header';
import ProductReviews from './content-product-review';
import { ImageVariantSelector, TitleVariantSelector } from './content-product-variants';

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
      <ContentHeader store={config.store} banner={config.banner} />
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
                <ProductHeader product={config.product} reviews={config.reviews} />
              </div>
              <div className="lg:col-start-0  lg:col-span-7  lg:col-start-1 lg:row-span-3 lg:row-start-1">
                <Images product={config.product} />
              </div>
              <div className=" flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
                <div className="flex flex-col gap-6">
                  <ImageVariantSelector variants={config.product.variants} />
                  <TitleVariantSelector variants={config.product.variants} />
                </div>
                <DiscountTable />
                <MoreDetailsLink store={config.store} />
                <div className="gap-2 divide-y empty:hidden">
                  <DisclosureSection title={'Product Details'}>
                    <div>{config.product.description}</div>
                  </DisclosureSection>
                  <DisclosureSection title={'Technical Specs'}>
                    <div className="p-4 font-normal">(technical details to be disclosed)</div>
                  </DisclosureSection>
                  <DisclosureSection title={'Shipping Policy'}>
                    <div>(shipping policy details to be disclosed)</div>
                  </DisclosureSection>
                  <DisclosureSection title={'Refund Policy'}>
                    <div>(refund policy details to be disclosed)</div>
                  </DisclosureSection>
                </div>
              </div>
            </div>
            <ProductReviews />
          </div>
          <div className="m-8 py-64 "> Below the fold content...</div>
          <CheckoutForm product={config.product} store={config.store} variantId={variantId} />
        </div>
      </div>
    </>
  );
}
