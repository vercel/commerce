import getQueryFromSlug from '@/helpers/get-query-from-slug';
import { clientFetch } from 'lib/sanity/sanity.client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPage from './pages/category-page';
import ProductPage from './pages/product-page';
import SinglePage from './pages/single-page';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string[] };
}): Promise<Metadata> {
  const { slug, locale } = params;

  const { query = '', queryParams } = getQueryFromSlug(slug, locale);

  const page = await clientFetch(query, queryParams);

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
    slug: string[];
  };
}

export default async function Page({ params }: PageParams) {
  const { slug, locale } = params;

  const { query = '', queryParams, docType } = getQueryFromSlug(slug, locale);

  return (
    <>
      {docType === 'page' && <SinglePage query={query} queryParams={queryParams} />}
      {docType === 'product' && <ProductPage query={query} queryParams={queryParams} />}
      {docType === 'category' && <CategoryPage query={query} queryParams={queryParams} />}
    </>
  );
}
