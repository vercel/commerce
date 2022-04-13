import { FetcherError } from '@vercel/commerce/utils/errors'
import type { GraphQLFetcher } from '@vercel/commerce/api'
import type { OpenCommerceConfig } from '../index'
import fetch from './fetch'

const fetchGraphqlApi: (
  getConfig: () => OpenCommerceConfig
) => GraphQLFetcher =
  (getConfig) =>
  async (query: string, { variables, preview } = {}, fetchOptions) => {
    // log.warn(query)
    const config = getConfig()
    const res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
      ...fetchOptions,
      method: 'POST',
      headers: {
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
        errors: json.errors ?? [
          { message: 'Failed to fetch OpenCommerce API' },
        ],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchGraphqlApi
