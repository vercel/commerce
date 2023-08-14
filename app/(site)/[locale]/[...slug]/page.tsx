import CategoryPage from '@/components/pages/category-page';
import ProductPage from '@/components/pages/product-page';
import SinglePage from '@/components/pages/single-page';
import getQueryFromSlug from '@/helpers/get-query-from-slug';
import { getCachedClient } from 'lib/sanity/sanity.client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string[] };
}): Promise<Metadata> {
  const { slug, locale } = params;

  const { query = '', queryParams } = getQueryFromSlug(slug, locale);

  const page = await getCachedClient()(query, queryParams);

  if (!page) return notFound();

  return {
    title: `${page.seo?.title || page.title}`,
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

  let pageData;

  if (docType === 'page') {
    pageData = await getCachedClient()(query, queryParams);
  } else if (docType === 'product') {
    pageData = await getCachedClient()(query, queryParams);
  } else if (docType === 'category') {
    pageData = await getCachedClient()(query, queryParams);
  } else {
    return;
  }

  if (!pageData) return notFound();

  return (
    <>
      {docType === 'page' && <SinglePage data={pageData} />}
      {docType === 'product' && <ProductPage data={pageData} />}
      {docType === 'category' && <CategoryPage data={pageData} />}
    </>
  );
}
