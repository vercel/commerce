import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import Navbar from 'components/layout/navbar';
import Stories from 'components/layout/stories';
import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
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

export default async function StoriesPage({
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
    <div>
      <Navbar cart={cart} locale={locale} compact />
      <div className="py-24 md:py-48">
        <Stories handle="headless" locale={locale} />
      </div>

      <Suspense>
        <Footer cart={cart} />
      </Suspense>
    </div>
  );
}
