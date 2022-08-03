import vercelFetch from '@vercel/fetch'
import { FetcherError } from '@vercel/commerce/utils/errors'

import { OlistConfig } from '..'

export type FetchRest = <T>(
  method: string,
  resource: string,
  body?: Record<string, unknown>,
  fetchOptions?: Record<string, any>
) => Promise<T>

// Get an instance to vercel fetch
const fetch = vercelFetch()

export async function fetchData<T>(opts: {
  token: string
  path: string
  method: string
  config: OlistConfig
  fetchOptions?: Record<string, any>
  body?: Record<string, unknown>
}): Promise<T> {
  // Destructure opts
  const { path, body, fetchOptions, config, token, method = 'GET' } = opts

  // Do the request with the correct headers
  const dataResponse = await fetch(
    `${config.commerceUrl}/${config.apiVersion}${path}`,
    {
      ...fetchOptions,
      method,
      headers: {
        ...fetchOptions?.headers,
        'Content-Type': 'application/json',
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  )

  // If something failed getting the data response
  if (!dataResponse.ok) {
    // Get the body of it
    const error = await dataResponse.textConverted()

    // And return an error
    throw new FetcherError({
      errors: [{ message: error || dataResponse.statusText }],
      status: dataResponse.status,
    })
  }

  try {
    const result = { data: await dataResponse.json() }
    // Return data response as json
    return result as unknown as Promise<T>
  } catch (error) {
    // If response is empty return it as text
    return null as unknown as Promise<T>
  }
}

export const createMiddlewareFetcher: (
  getConfig: () => OlistConfig
) => FetchRest =
  (getConfig) =>
  async <T>(
    method: string,
    path: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => {
    // Get provider config
    const config = getConfig()

    // Get a token
    const token = config.apiToken

    // Return the data and specify the expected type
    return fetchData<T>({
      token,
      fetchOptions,
      method,
      config,
      path,
      body,
    })
  }

export const createBuyerFetcher: (getConfig: () => OlistConfig) => FetchRest =
  (getConfig) =>
  async <T>(
    method: string,
    path: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => {
    // Get provider config
    const config = getConfig()

    // If a token was passed, set it on global
    if (fetchOptions?.token) {
      ;(global as any).token = fetchOptions.token
    }

    // Get a token
    if (!(global as any).token) {
      ;(global as any).token = config.apiToken
    }

    // Return the data and specify the expected type
    const data = await fetchData<T>({
      token: (global as any).token as string,
      fetchOptions,
      config,
      method,
      path,
      body,
    })

    return {
      ...data,
      meta: { token: (global as any).token as string },
    }
  }
