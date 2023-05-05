import getQueryFromSlug from 'helpers/getQueryFromSlug';
import { docQuery } from 'lib/sanity/queries';
import { client } from 'lib/sanity/sanity.client';
import type { Metadata } from 'next';
import CategoryPage from './category-page';
import HomePage from './home-page';
import ProductPage from './product-page';
import SinglePage from './single-page';

/**
 * Get paths for each page.
 */
export async function generateStaticParams() {
  const paths = await client.fetch(docQuery, {
    next: { revalidate: 10 },
  })

  return paths.map((path: { 
    slug: string,
    locale: string
  }) => ({
    slug: path.slug.split('/').filter((p) => p),
    locale: path.locale
  }))
}

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
function filterDataToSingleItem(data: any, preview = false) {
  
  if (!Array.isArray(data)) {
    return data
  }

  if (data.length === 1) {
    return data[0]
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
  }

  return data[0]
}

/**
 * Generate metadata for each page.
 */
export async function generateMetadata({ params }: {params: { slug: string[], locale: string }}): Promise<Metadata> {
  const { slug, locale } = params

  const { query = '', queryParams } = getQueryFromSlug(slug, locale)

  const pageData = await client.fetch(query, queryParams)

  const data = filterDataToSingleItem(pageData, false)

  const { seo } = data ?? {};

  return {
    title: seo?.title ? seo?.title : data?.title,
    description: seo?.description
      ? seo.description
      : 'Webb och digitalbyrå från Göteborg',
    openGraph: {
      images: [
        {
          url: seo?.image?.asset?.url
            ? seo.image.asset.url
            : '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: seo?.coverImage?.alt
            ? seo.coverImage.alt
            : 'Kodamera AB',
        },
      ],
    },
  }
}

/**
 * Render pages depending on type.
 */
export default async function Page({
  params,
}: {
  params: { slug: string[], locale: string };
}) {
  const { slug, locale } = params;
  
  const { query = '', queryParams, docType } = getQueryFromSlug(slug, locale)

  const pageData = await client.fetch(query, queryParams)

  const data = filterDataToSingleItem(pageData, false)
  
  return (
    <>
      {docType === 'home' && <HomePage data={data} />}
      {docType === 'product' && <ProductPage data={data} />}
      {docType === 'category' && <CategoryPage data={data} />}
      {docType === 'page' && <SinglePage data={data} />}
    </>
  )
}