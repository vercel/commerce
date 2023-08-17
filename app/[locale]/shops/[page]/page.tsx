import type { Metadata } from 'next';

import { SupportedLocale } from 'components/layout/navbar/language-control';
import Prose from 'components/prose';
import { getPage } from 'lib/shopify';
import { notFound } from 'next/navigation';
import ShopsTitle from './ShopsTitle';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string; locale: SupportedLocale };
}): Promise<Metadata> {
  const page = await getPage({ handle: params.page, language: params?.locale?.toUpperCase() });

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

export default async function Page({
  params
}: {
  params: { page: string; locale: SupportedLocale };
}) {
  const page = await getPage({ handle: params.page, language: params?.locale?.toUpperCase() });

  if (!page) return notFound();

  return (
    <div className="font-multilingual min-h-screen px-4 text-white">
      <ShopsTitle />
      <h2 className="mb-8 text-3xl font-medium">{page.title}</h2>
      <Prose className="mb-8" html={page.body as string} />
    </div>
  );
}
