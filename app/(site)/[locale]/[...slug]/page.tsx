import CategoryPage from '@/components/pages/category-page';
import CategoryPagePreview from '@/components/pages/category-page-preview';
import ProductPage from '@/components/pages/product-page';
import ProductPagePreview from '@/components/pages/product-page-preview';
import SearchPage from '@/components/pages/search-page';
import SearchPagePreview from '@/components/pages/search-page-preview';
import SinglePage from '@/components/pages/single-page';
import SinglePagePreview from '@/components/pages/single-page-preview';
import getQueryFromSlug from '@/helpers/get-query-from-slug';
import { categoryQuery, pageQuery, productQuery, searchPageQuery } from '@/lib/sanity/queries';
import { getCategory, getPage, getProduct, getSearch } from '@/lib/sanity/sanity.fetch';
import type { Metadata } from 'next';
import { LiveQuery } from 'next-sanity/preview/live-query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string[] };
}): Promise<Metadata> {
  const { slug, locale } = params;

  const { queryParams, docType } = getQueryFromSlug(slug, locale);

  let page;

  if (docType === 'page') {
    page = await getPage(queryParams.slug, queryParams.locale);
  } else if (docType === 'product') {
    page = await getProduct(queryParams.slug, queryParams.locale);
  } else if (docType === 'category') {
    page = await getCategory(queryParams.slug, queryParams.locale);
  } else if (docType === 'search') {
    page = await getSearch(queryParams.slug, queryParams.locale);
  }

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

  let PagePreview;

  if (docType === 'page') {
    PagePreview = SinglePagePreview;
  } else if (docType === 'product') {
    PagePreview = ProductPagePreview;
  } else if (docType === 'category') {
    PagePreview = CategoryPagePreview;
  } else if (docType === 'search') {
    PagePreview = SearchPagePreview;
  }

  let query = '';

  if (docType === 'page') {
    query = pageQuery;
  } else if (docType === 'product') {
    query = productQuery;
  } else if (docType === 'category') {
    query = categoryQuery;
  } else if (docType === 'search') {
    query = searchPageQuery;
  }

  if (!query && !PagePreview && !data && !draftMode().isEnabled) {
    notFound();
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={query}
      params={{ slug: queryParams.slug, locale: queryParams.locale }}
      initialData={data}
      as={PagePreview}
    >
      <>
        {docType === 'page' && <SinglePage data={data} />}
        {docType === 'product' && <ProductPage data={data} />}
        {docType === 'category' && <CategoryPage data={data} />}
        {docType === 'search' && <SearchPage data={data} />}
      </>
    </LiveQuery>
  );
}
