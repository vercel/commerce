import { FetcherError } from '@vercel/commerce/utils/errors'
import type { GraphQLFetcher } from '@vercel/commerce/api'
import type { BigcommerceConfig } from '../index'

const fetchGraphqlApi: (getConfig: () => BigcommerceConfig) => GraphQLFetcher =
  (getConfig) =>
  async (
    query: string,
    { variables, preview } = {},
    options: { headers?: HeadersInit } = {}
  ): Promise<any> => {
    // log.warn(query)
    const config = getConfig()

    const res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        ...options.headers,
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
        errors: json.errors ?? [{ message: 'Failed to fetch Bigcommerce API' }],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchGraphqlApi
