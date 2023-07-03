// Next
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
// Sanity
import PreviewSuspense from 'components/preview-suspense';
import getQueryFromSlug from 'helpers/getQueryFromSlug';
import { docQuery } from 'lib/sanity/queries';
import { clientFetch } from 'lib/sanity/sanity.client';
// Pages.
import CategoryPage from './category-page';
import CategoryPagePreview from './category-page-preview';
import HomePage from './home-page';
import HomePagePreview from './home-page-preview';
import ProductPage from './product-page';
import ProductPagePreview from './product-page-preview';
import SinglePage from './single-page';
import SinglePagePreview from './single-page-preview';

/**
 * Render pages depending on type.
 */
export default async function Page({ params }: { params: { slug: string[]; locale: string } }) {
  const { isEnabled } = draftMode();

  const { slug, locale } = params;

  const { query = '', queryParams, docType } = getQueryFromSlug(slug, locale);

  const pageData = await clientFetch(query, queryParams);

  const data = filterDataToSingleItem(pageData, isEnabled);

  if (isEnabled) {
    return (
      <PreviewSuspense fallback="Loading...">
        {docType === 'home' && <HomePagePreview query={query} queryParams={queryParams} />}
        {docType === 'page' && <SinglePagePreview query={query} queryParams={queryParams} />}
        {docType === 'product' && <ProductPagePreview query={query} queryParams={queryParams} />}
        {docType === 'category' && <CategoryPagePreview query={query} queryParams={queryParams} />}
      </PreviewSuspense>
    );
  }

  return (
    <>
      {docType === 'home' && <HomePage data={data} />}
      {docType === 'product' && <ProductPage data={data} />}
      {docType === 'category' && <CategoryPage data={data} />}
      {docType === 'page' && <SinglePage data={data} />}
    </>
  );
}

// Background revalidate once every day.
// export const revalidate = 86400;

/**
 * Get paths for each page.
 */
export async function generateStaticParams() {
  const paths = await clientFetch(docQuery);

  return paths.map((path: { slug: string; locale: string }) => ({
    slug: path.slug.split('/').filter((p) => p),
    locale: path.locale
  }));
}

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
function filterDataToSingleItem(data: any, preview = false) {
  if (!Array.isArray(data)) {
    return data;
  }

  if (data.length === 1) {
    return data[0];
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0];
  }

  return data[0];
}

/**
 * Generate metadata for each page.
 */
export async function generateMetadata({
  params
}: {
  params: { slug: string[]; locale: string };
}): Promise<Metadata> {
  const { slug, locale } = params;

  const { query = '', queryParams } = getQueryFromSlug(slug, locale);

  const pageData = await clientFetch(query, queryParams);

  const data = filterDataToSingleItem(pageData, false);

  const { seo } = data ?? {};

  return {
    title: seo?.title ? seo?.title : data?.title,
    description: seo?.description ? seo.description : 'Webb och digitalbyrå från Göteborg',
    openGraph: {
      images: [
        {
          url: seo?.image?.asset?.url ? seo.image.asset.url : '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: seo?.coverImage?.alt ? seo.coverImage.alt : 'Kodamera AB'
        }
      ]
    }
  };
}
