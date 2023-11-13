import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import Navbar from 'components/layout/navbar';
import { getCart, getProduct } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { unstable_setRequestLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Disclosures from './disclosures';

const { SITE_NAME } = process.env;

export const metadata = {
  title: SITE_NAME,
  description: SITE_NAME,
  openGraph: {
    type: 'website'
  }
};

export default async function DisclosuresPage({
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
      <Navbar cart={cart} locale={locale} compact promotedItem={promotedItem} />
      <Suspense fallback={null}>
        <div className="py-24 md:py-48">
          <Disclosures />
        </div>
      </Suspense>

      <Footer cart={cart} />
    </div>
  );
}
