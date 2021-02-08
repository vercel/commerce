import type { GraphQLFetcher } from '@commerce/api'
import fetch from './fetch'

import { API_URL, API_TOKEN } from '../../config'
import { getError } from '@framework/utils/handle-fetch-response'

if (!API_URL) {
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

  const { data, errors, status } = await res.json()

  if (errors) {
    throw getError(errors, status)
  }

  return { data: data, res }
}
export default fetchGraphqlApi
