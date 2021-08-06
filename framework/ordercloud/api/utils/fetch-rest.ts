import { FetcherError } from '@commerce/utils/errors'
import type { OrdercloudConfig } from '../index'
import fetch from './fetch'

const fetchRestApi: (
  getConfig: () => OrdercloudConfig
) => <T>(
  method: string,
  resource: string,
  body?: Record<string, unknown>,
  fetchOptions?: Record<string, any>
) => Promise<T> =
  (getConfig) =>
  async <T>(
    method: string,
    resource: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => {
    const { commerceUrl } = getConfig()
    const res = await fetch(`${commerceUrl}${resource}`, {
      ...fetchOptions,
      method,
      headers: {
        ...fetchOptions?.headers,
        accept: 'application/json, text/plain, */*',
        'accept-language': 'es,en;q=0.9,es-ES;q=0.8,fr;q=0.7',
        authorization: 'Bearer <your token>',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
      throw new FetcherError({
        errors: [{ message: res.statusText }],
        status: res.status,
      })
    }

    return (await res.json()) as T
  }

export default fetchRestApi
