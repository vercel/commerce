import 'server-only'

import type { QueryParams } from '@sanity/client'
import { client } from './sanity.client'

import { draftMode } from 'next/headers'

import { revalidateSecret } from './sanity.api'

import { categoryQuery, homePageQuery, pageQuery, productQuery, searchPageQuery } from './queries'

import { CategoryPayload, HomePagePayload, PagePayload, ProductPayload, SearchPayload } from './sanity.types'

export const token = process.env.SANITY_API_READ_TOKEN

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string
  params?: QueryParams
  tags: string[]
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled
  if (isDraftMode && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.',
    )
  }

  // @TODO this won't be necessary after https://github.com/sanity-io/client/pull/299 lands
  const sanityClient =
    client.config().useCdn && isDraftMode
      ? client.withConfig({ useCdn: false })
      : client
  return sanityClient.fetch<QueryResponse>(query, params, {
    // We only cache if there's a revalidation webhook setup
    cache: revalidateSecret ? 'force-cache' : 'no-store',
    ...(isDraftMode && {
      cache: undefined,
      token: token,
      perspective: 'previewDrafts',
    }),
    next: {
      ...(isDraftMode && { revalidate: 30 }),
      tags,
    },
  })
}

export function getHomePage(locale: string) {
  return sanityFetch<HomePagePayload | null>({
    query: homePageQuery,
    params: { locale },
    tags: ['home', 'products', 'categories', 'page'],
  })
}

export function getPage(slug: string, locale: string) {
  return sanityFetch<PagePayload | null>({
    query: pageQuery,
    params: { slug, locale },
    tags: ['page'],
  })
}

export function getProduct(slug: string, locale: string) {
  return sanityFetch<ProductPayload | null>({
    query: productQuery,
    params: { slug, locale },
    tags: ['product'],
  })
}

export function getCategory(slug: string, locale: string) {
  return sanityFetch<CategoryPayload | null>({
    query: categoryQuery,
    params: { slug, locale },
    tags: ['category'],
  })
}

export function getSearch(slug: string, locale: string) {
  return sanityFetch<SearchPayload | null>({
    query: searchPageQuery,
    params: { slug, locale },
    tags: ['search'],
  })
}