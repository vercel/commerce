import { FetcherError } from '@vercel/commerce/utils/errors'
import type { FetchOptions, GraphQLFetcher } from '@vercel/commerce/api'
import type { OpenCommerceConfig } from '../index'

const fetchGraphqlApi: (
  getConfig: () => OpenCommerceConfig
) => GraphQLFetcher =
  (getConfig) =>
  async (
    query: string,
    { variables } = {},
    options?: FetchOptions
  ): Promise<any> => {
    // log.warn(query)
    const config = getConfig()
    const res = await fetch(config.commerceUrl, {
      ...options,
      method: 'POST',
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
        errors: json.errors ?? [
          { message: 'Failed to fetch OpenCommerce API' },
        ],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchGraphqlApi
