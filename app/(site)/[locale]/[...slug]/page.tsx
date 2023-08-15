import CategoryPage from '@/components/pages/category-page';
import ProductPage from '@/components/pages/product-page';
import SearchPage from '@/components/pages/search-page';
import SearchPagePreview from '@/components/pages/search-page-preview';
import SinglePage from '@/components/pages/single-page';
import SinglePagePreview from '@/components/pages/single-page-preview';
import PreviewProvider from '@/components/preview-provider';
import getQueryFromSlug from '@/helpers/get-query-from-slug';
import { getCachedClient } from 'lib/sanity/sanity.client';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

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
  const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined;

  const { slug, locale } = params;

  const { query = '', queryParams, docType } = getQueryFromSlug(slug, locale);

  let pageData;

  if (docType === 'page') {
    pageData = await getCachedClient()(query, queryParams);
  } else if (docType === 'product') {
    pageData = await getCachedClient()(query, queryParams);
  } else if (docType === 'category') {
    pageData = await getCachedClient()(query, queryParams);
  } else if (docType === 'search') {
    pageData = await getCachedClient()(query, queryParams);
  } else {
    return;
  }

  if (!pageData) return notFound();

  if (preview && preview.token) {
    return (
      <PreviewProvider token={preview.token}>
        {docType === 'page' && <SinglePagePreview initialData={pageData} params={queryParams} />}
        {docType === 'search' && <SearchPagePreview initialData={pageData} params={queryParams} />}
      </PreviewProvider>
    );
  }

  return (
    <>
      {docType === 'page' && <SinglePage data={pageData} />}
      {docType === 'product' && <ProductPage data={pageData} />}
      {docType === 'category' && <CategoryPage data={pageData} />}
      {docType === 'search' && <SearchPage data={pageData} />}
    </>
  );
}
