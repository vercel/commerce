import type { Metadata } from 'next';

import LogoNamemark from 'components/icons/namemark';
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
  const page = await getPage({ handle: 'shop-list', language: params?.locale?.toUpperCase() });

  if (!page) return notFound();

  return (
    <div className="font-multilingual mx-auto min-h-screen max-w-screen-2xl px-4 text-white">
      <div className="pb-12">
        <LogoNamemark className="w-[260px] fill-current md:w-[320px]" />
      </div>
      <ShopsTitle />
      <h2 className="mb-8 text-3xl font-medium">{page.title}</h2>
      <Prose className="mx-auto mb-8 max-w-xl" html={page.body as string} />
    </div>
  );
}
