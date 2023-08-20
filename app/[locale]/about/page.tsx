import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import Navbar from 'components/layout/navbar';
import { getCart, getPage } from 'lib/shopify';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import AboutNaraiDetail from './about-narai-detail';

export const runtime = 'edge';
const { SITE_NAME } = process.env;

export const metadata = {
  title: SITE_NAME,
  description: SITE_NAME,
  openGraph: {
    type: 'website'
  }
};

export default async function Page({ params }: { params: { locale?: SupportedLocale } }) {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  const awardsPage = await getPage({ handle: 'awards', language: params?.locale?.toUpperCase() });

  return (
    <div>
      <Navbar cart={cart} locale={params?.locale} compact />
      <div className="pt-24">
        <AboutNaraiDetail awards={awardsPage.body} />
      </div>

      <Suspense>
        <Footer cart={cart} />
      </Suspense>
    </div>
  );
}
