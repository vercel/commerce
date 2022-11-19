import { FetcherError } from '@vercel/commerce/utils/errors'
import type { GraphQLFetcher } from '@vercel/commerce/api'
import { getCommerceApi } from '../'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  headers?: HeadersInit
) => {
  const config = getCommerceApi().getConfig()

  const res = await fetch(config.commerceUrl, {
    method: 'POST',
    headers: {
      ...headers,
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
      errors: json.errors ?? [{ message: 'Failed to fetch Vendure API' }],
      status: res.status,
    })
  }

  return { data: json.data, res }
}

export default fetchGraphqlApi
