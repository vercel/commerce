import { FetcherError } from '@commerce/utils/errors'
import type { GraphQLFetcher } from '@commerce/api'
import type { LocalConfig } from '../index'
import fetch from './fetch'

const fetchGraphqlApi: (getConfig: () => LocalConfig) => GraphQLFetcher =
  (getConfig) =>
  async (query: string, { variables, preview } = {}, fetchOptions) => {
    const config = getConfig()
    const res = await fetch(config.commerceUrl, {
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
        errors: json.errors ?? [{ message: 'Failed to fetch for API' }],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchGraphqlApi
