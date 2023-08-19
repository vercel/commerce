import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import clsx from 'clsx';
import AboutNaraiPreview from 'components/layout/about-narai-preview';
import Navbar from 'components/layout/navbar';
import NewsletterSignup from 'components/layout/newsletter-signup';
import Shoplist from 'components/layout/shoplist';
import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { Suspense } from 'react';
import HomeImage001 from './images/home-image-001.webp';
import HomeImage002 from './images/home-image-002.webp';
import HomeImage003 from './images/home-image-003.webp';

export const runtime = 'edge';
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
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return (
    <div className="relative h-screen overflow-scroll">
      <Navbar cart={cart} locale={locale} />
      <div className="pt-48">
        <ThreeItemGrid lang={locale} />
      </div>
      <div className="py-48">
        <NewsletterSignup />
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
        <Shoplist />
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
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer cart={cart} />
        </Suspense>
      </Suspense>
    </div>
  );
}
