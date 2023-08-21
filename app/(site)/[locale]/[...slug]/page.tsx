import CategoryPage from '@/components/pages/category-page';
import ProductPage from '@/components/pages/product-page';
import SearchPage from '@/components/pages/search-page';
import SinglePage from '@/components/pages/single-page';
// import PreviewProvider from '@/components/preview-provider';
import getQueryFromSlug from '@/helpers/get-query-from-slug';
import { getCategory, getPage, getProduct, getSearch } from '@/lib/sanity/sanity.fetch';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string[] };
}): Promise<Metadata> {
  const { slug, locale } = params;

  const { queryParams, docType } = getQueryFromSlug(slug, locale);

  let page;

  docType === 'page' && (page = await getPage(queryParams.slug, queryParams.locale));
  docType === 'product' && (page = await getProduct(queryParams.slug, queryParams.locale));
  docType === 'category' && (page = await getCategory(queryParams.slug, queryParams.locale));
  docType === 'search' && (page = await getSearch(queryParams.slug, queryParams.locale));

  if (!page) return notFound();

  return {
    title: `${page.seo?.title || page.title}`,
    description: page.seo?.description,
    openGraph: {
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

interface PageParams {
  params: {
    slug: string[];
    locale: string;
  };
}

export default async function Page({ params }: PageParams) {
  const { slug, locale } = params;

  const { queryParams, docType } = getQueryFromSlug(slug, locale);

  let data;

  if (docType === 'page') {
    data = await getPage(queryParams.slug, queryParams.locale);
  } else if (docType === 'product') {
    data = await getProduct(queryParams.slug, queryParams.locale);
  } else if (docType === 'category') {
    data = await getCategory(queryParams.slug, queryParams.locale);
  } else if (docType === 'search') {
    data = await getSearch(queryParams.slug, queryParams.locale);
  }

  if (!data) {
    notFound();
  }

  return (
    <>
      {docType === 'page' && <SinglePage data={data} />}
      {docType === 'product' && <ProductPage data={data} />}
      {docType === 'category' && <CategoryPage data={data} />}
      {docType === 'search' && <SearchPage data={data} />}
    </>
  );
}
