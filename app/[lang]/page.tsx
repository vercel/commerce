import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { LanguageControl } from 'components/layout/navbar/language-control';
import type { Locale } from '../../i18n-config';

import LogoNamemark from 'components/icons/namemark';
import NewsletterSignup from 'components/layout/newsletter-signup';
import { Suspense } from 'react';

export const runtime = 'edge';
const { SITE_NAME } = process.env;

export const metadata = {
  title: SITE_NAME,
  description: SITE_NAME,
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <>
      <div className="invisible absolute right-40 top-12 md:visible">
        <LanguageControl lang={lang} />
      </div>
      <div className="px-6 pb-12 pt-6 md:pb-48 md:pl-6 md:pt-12">
        <LogoNamemark className="w-[260px] fill-current md:w-[600px]" />
      </div>
      <ThreeItemGrid lang={lang} />
      <div className="py-24">
        <NewsletterSignup />
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
