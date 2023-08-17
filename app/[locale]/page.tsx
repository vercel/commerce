import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { LanguageControl, SupportedLocale } from 'components/layout/navbar/language-control';

import clsx from 'clsx';
import LogoNamemark from 'components/icons/namemark';
import NewsletterSignup from 'components/layout/newsletter-signup';
import Shoplist from 'components/layout/shoplist';
import Image from 'next/image';
import { Suspense } from 'react';
import HomeImage001 from './images/home-image-001.webp';

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
  params: { locale: SupportedLocale };
}) {
  return (
    <>
      <div className="invisible absolute right-40 top-12 md:visible">
        <LanguageControl lang={locale} />
      </div>
      <div className="px-6 pb-12 pt-6 md:pb-48 md:pl-6 md:pt-12">
        <LogoNamemark className="w-[260px] fill-current md:w-[600px]" />
      </div>
      <ThreeItemGrid lang={locale} />
      <div className="py-48">
        <NewsletterSignup />
      </div>
      <div className="relative max-w-screen-2xl">
        <Image
          src={HomeImage001}
          alt="A picture of Narai Black bottle in a mossy creek."
          className={clsx('h-full w-full object-cover')}
        />
      </div>
      <div className="py-24">
        <Shoplist />
      </div>
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
