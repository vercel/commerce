import type { Metadata } from 'next';

import Footer from 'components/layout/footer';
import Navbar from 'components/layout/navbar';
import { SupportedLocale } from 'components/layout/navbar/language-control';
import Prose from 'components/prose';
import { getCart, getPage, getProduct } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ShopsNav from './shops-nav';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { locale?: SupportedLocale };
}): Promise<Metadata> {
  const page = await getPage({ handle: 'shop-list', language: params?.locale?.toUpperCase() });

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { locale?: SupportedLocale } }) {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  const page = await getPage({ handle: 'shop-list', language: params?.locale?.toUpperCase() });

  if (!page) return notFound();

  const promotedItem: Product | undefined = await getProduct({
    handle: 'gift-bag-and-postcard-set',
    language: params?.locale?.toUpperCase()
  });

  return (
    <div>
      <Navbar cart={cart} locale={params?.locale} compact showTop promotedItem={promotedItem} />
      <div className="mx-auto max-w-xl px-6 pb-24 pt-12 md:pb-48 md:pt-24">
        <div className="pb-12">
          <ShopsNav />
        </div>
        {/* <h2 className="font-multilingual mb-8 text-3xl font-medium">{page.title}</h2> */}
        <Prose html={page.body as string} />
      </div>

      <Suspense>
        <Footer cart={cart} />
      </Suspense>
    </div>
  );
}
