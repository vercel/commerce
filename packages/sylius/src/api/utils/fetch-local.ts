import { FetcherError } from '@vercel/commerce/utils/errors'
import type { GraphQLFetcher } from '@vercel/commerce/api'
import type { SyliusConfig } from '../index'
import fetch from './fetch'

const fetchGraphqlApi: (getConfig: () => SyliusConfig) => GraphQLFetcher =
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

export const fetchRestApi = async <T>(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  fetchOptions?: Record<string, any>
) => {
  const res = await fetch(process.env.NEXT_PUBLIC_SYLIUS_API_URL + path, {
    ...fetchOptions,
    method,
    headers: {
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const jsonResponse = await res.json()
  return jsonResponse as T
}

export default { fetchGraphqlApi, fetchRestApi }
