import type { GraphQLFetcher } from '@commerce/api'
import { FetcherError } from '@commerce/utils/errors'
import fetch from './fetch'

import { STORE_DOMAIN, API_URL, API_TOKEN } from '../config'

if (!STORE_DOMAIN) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing and it's required to access your store`
  )
}

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions
) => {
  const res = await fetch(API_URL, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': API_TOKEN!,
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    throw new FetcherError({
      errors: json.errors ?? [{ message: 'Failed to fetch Shopify API' }],
      status: res.status,
    })
  }

  return { data: json.data, res }
}
export default fetchGraphqlApi
