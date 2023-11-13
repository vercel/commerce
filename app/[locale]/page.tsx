import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import HomeImage001 from '@images/home-images/home-image-001.webp';
import HomeImage002 from '@images/home-images/home-image-002.webp';
import HomeImage003 from '@images/home-images/home-image-003.webp';
import HomeImage004 from '@images/home-images/home-image-004.webp';
import HomeImage005 from '@images/home-images/home-image-005.webp';
import HomeImage006 from '@images/home-images/home-image-006.webp';
import HomeImage007 from '@images/home-images/home-image-007.webp';
import HomeImage008 from '@images/home-images/home-image-008.webp';
import clsx from 'clsx';
import { HomepageProducts } from 'components/grid/homepage-products';
import AboutNaraiPreview from 'components/layout/about-narai-preview';
import ConceptPreview from 'components/layout/concept-preview';
import LocationPreview from 'components/layout/location-preview';
import Navbar from 'components/layout/navbar';
import NewsletterSignup from 'components/layout/newsletter-signup';
import SagyobarPreview from 'components/layout/sagyobar-preview';
import Shoplist from 'components/layout/shoplist';
import StoriesPreview from 'components/layout/stories-preview';
import { BLOG_HANDLE } from 'lib/constants';
import { getCart, getProduct } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { unstable_setRequestLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { Suspense } from 'react';

const { SITE_NAME } = process.env;

export const metadata = {
  title: SITE_NAME,
  description: SITE_NAME,
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage({
  params: { locale }
}: {
  params: { locale?: SupportedLocale };
}) {
  if (!!locale) {
    unstable_setRequestLocale(locale);
  }

  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  const promotedItem: Product | undefined = await getProduct({
    handle: 'gift-bag-and-postcard-set',
    language: locale?.toUpperCase()
  });

  return (
    <div>
      <Navbar cart={cart} locale={locale} promotedItem={promotedItem} />
      <div className="pt-12 md:pt-48">
        <HomepageProducts lang={locale} />
      </div>
      <div className="py-24 md:py-48">
        <Suspense fallback={null}>
          <NewsletterSignup />
        </Suspense>
      </div>
      <div className="relative mx-auto max-w-screen-xl">
        <Image
          src={HomeImage001}
          priority={true}
          alt="A picture of Narai Black bottle in a mossy creek."
          className={clsx('h-full w-full object-cover')}
        />
      </div>
      <div className="py-24">
        <Suspense fallback={null}>
          <Shoplist />
        </Suspense>
      </div>

      <div className="relative pb-48">
        <Image
          src={HomeImage002}
          priority={true}
          alt="A picture of tree tops."
          className={clsx('h-full w-full object-cover')}
        />
      </div>

      <div className="relative mx-auto max-w-screen-xl">
        <Image
          src={HomeImage003}
          priority={true}
          alt="A picture of mountain stream water on a log, next to a rock."
          className={clsx('h-full w-full object-cover')}
        />

        <AboutNaraiPreview />
      </div>

      <div className="relative mx-auto max-w-screen-xl">
        <Image
          src={HomeImage004}
          priority={true}
          alt="A picture of the main road in Narai-juku, Nagano Prefecture, Japan."
          className={clsx('h-full w-full object-cover')}
        />

        <LocationPreview />
      </div>

      <div className="relative pb-24">
        <Image
          src={HomeImage005}
          priority={true}
          alt="A picture of mountain tops."
          className={clsx('h-full w-full object-cover')}
        />
      </div>

      <div className="relative mx-auto max-w-screen-xl">
        <Image
          src={HomeImage006}
          priority={true}
          alt="A picture of the interior of the Sagyobar."
          className={clsx('h-full w-full object-cover')}
        />

        <SagyobarPreview />
      </div>

      <div className="relative mx-auto max-w-screen-xl">
        <Image
          src={HomeImage007}
          priority={true}
          alt="A picture of the interior of the brewery."
          className={clsx('h-full w-full object-cover')}
        />

        <ConceptPreview />
      </div>

      <div className="relative">
        <StoriesPreview handle={BLOG_HANDLE} articles={3} locale={locale} more />
      </div>

      <div className="relative">
        <Image
          src={HomeImage008}
          priority={true}
          alt="A picture of a forest in Nagano, Japan."
          className={clsx('h-full w-full object-cover')}
        />
      </div>

      <Footer cart={cart} promotedItem={promotedItem} />
    </div>
  );
}
