import { FetcherError } from '@commerce/utils/errors'
import vercelFetch from '@vercel/fetch'
import { MedusaConfig } from '../'

const fetch = vercelFetch()

export async function fetchData<T>(opts: {
  path: string
  method: string
  config: MedusaConfig
  fetchOptions?: Record<string, any>
  body?: Record<string, unknown>
}): Promise<T> {
  const { path, body, fetchOptions, config, method = 'GET' } = opts

  const response = await fetch(`${config.commerceUrl}${path}`, {
    ...fetchOptions,
    method,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain, */*',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const error = await response.textConverted()

    throw new FetcherError({
      errors: [{ message: error || response.statusText }],
      status: response.status,
    })
  }

  try {
    const res = await response.json()
    return res as Promise<T>
  } catch (error) {
    return null as unknown as Promise<T>
  }
}

export const createFetcher: (
  getConfig: () => MedusaConfig
) => <T>(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  fetchOptions?: Record<string, any>
) => Promise<T> =
  (getConfig) =>
  async <T>(
    method: string,
    path: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => {
    const config = getConfig()

    return await fetchData<T>({
      fetchOptions,
      config,
      method,
      path,
      body,
    })
  }
