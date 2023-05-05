// 'use client';
 
import getQueryFromSlug from 'helpers/getQueryFromSlug';
import { docQuery } from 'lib/sanity/queries';
import { client } from 'lib/sanity/sanity.client';
import { groq } from 'next-sanity';
import CategoryPage from './category-page';
import HomePage from './home-page';
import ProductPage from './product-page';
import SinglePage from './single-page';

export async function generateStaticParams() {
  const paths = await client.fetch(groq`${docQuery}`, {
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