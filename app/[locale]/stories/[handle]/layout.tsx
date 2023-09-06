import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import Navbar from 'components/layout/navbar';
import { getCart, getProduct } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { cookies } from 'next/headers';
import { ReactNode, Suspense } from 'react';

export const runtime = 'edge';
const { SITE_NAME } = process.env;

export const metadata = {
  title: SITE_NAME,
  description: SITE_NAME,
  openGraph: {
    type: 'website'
  }
};

export default async function BlogLayout({
  params: { locale },
  children
}: {
  params: { locale?: SupportedLocale };
  children: ReactNode[] | ReactNode | string;
}) {
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
      {children}
      <Suspense>
        <Footer cart={cart} />
      </Suspense>
    </div>
  );
}
