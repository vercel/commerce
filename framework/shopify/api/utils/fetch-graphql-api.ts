import { CommerceAPIFetchOptions } from '@commerce/api'
import { FetcherError } from '@commerce/utils/errors'
import { getConfig } from '../index'

export interface GraphQLFetcherResult<Data = any> {
  data: Data
  res: Response
}
export type GraphQLFetcher<
  Data extends GraphQLFetcherResult = GraphQLFetcherResult,
  Variables = any
> = (
  query: string,
  queryData?: CommerceAPIFetchOptions<Variables>,
  fetchOptions?: RequestInit
) => Promise<Data>

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions
) => {
  const config = getConfig()
  const url = `https://${config.commerceUrl}/api/2021-01/graphql.json`

  const res = await fetch(url, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': config.apiToken,
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
