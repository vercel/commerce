import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import Navbar from 'components/layout/navbar';
import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Disclosures from './disclosures';

export const runtime = 'edge';
export const revalidate = 43200; // 12 hours in seconds

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
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart({ cartId, language: locale?.toUpperCase() });
  }

  return (
    <div>
      <Navbar cart={cart} locale={locale} compact />
      <div className="py-24 md:py-48">
        <Disclosures />
      </div>

      <Suspense>
        <Footer cart={cart} />
      </Suspense>
    </div>
  );
}
