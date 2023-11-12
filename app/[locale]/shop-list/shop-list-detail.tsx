'use server';

import Prose from 'components/prose';
import { getPage } from 'lib/shopify';
import { notFound } from 'next/navigation';

export default async function ShopListDetail({ language }: { language?: string }) {
  const page = await getPage({ handle: 'shop-list', language });

  if (!page) return notFound();

  return <Prose html={page.body as string} />;
}
