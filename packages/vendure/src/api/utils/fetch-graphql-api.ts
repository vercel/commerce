import { FetcherError } from '@vercel/commerce/utils/errors'
import type { FetchOptions, GraphQLFetcher } from '@vercel/commerce/api'
import { getCommerceApi } from '../'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  options?: FetchOptions
) => {
  const config = getCommerceApi().getConfig()

  const res = await fetch(config.commerceUrl, {
    method: options?.method || 'POST',
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...options?.body,
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    throw new FetcherError({
      errors: json.errors ?? [{ message: 'Failed to fetch Vendure API' }],
      status: res.status,
    })
  }

  return { data: json.data, res }
}

export default fetchGraphqlApi
