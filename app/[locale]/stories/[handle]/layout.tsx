import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import Navbar from 'components/layout/navbar';
import { getCart } from 'lib/shopify';
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
    cart = await getCart({ cartId, language: locale?.toUpperCase() });
  }

  return (
    <div>
      <Navbar cart={cart} locale={locale} compact />
      {children}
      <Suspense>
        <Footer cart={cart} />
      </Suspense>
    </div>
  );
}
