import type { GraphQLFetcher } from '@commerce/api'
import { FetcherError } from '@commerce/utils/errors'
import { getConfig } from '../api/index'
import fetch from './fetch'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions
) => {
  const { commerceUrl, apiToken } = getConfig()

  const res = await fetch(`https://${commerceUrl}/api/2021-01/graphql.json`, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': apiToken,
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
