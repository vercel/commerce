import DynamicContentManager from 'components/layout/dynamic-content-manager';
import { pageQuery } from 'lib/sanity/queries';
import { clientFetch } from 'lib/sanity/sanity.client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const page = await clientFetch(pageQuery, params);

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

interface PageParams {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function Page({ params }: PageParams) {
  const page = await clientFetch(pageQuery, params);

  if (!page) return notFound();

  return <DynamicContentManager content={page?.content} />;
}
