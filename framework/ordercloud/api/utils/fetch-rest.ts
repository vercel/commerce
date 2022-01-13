import vercelFetch from '@vercel/fetch'
import { FetcherError } from '@commerce/utils/errors'
import { CustomNodeJsGlobal } from '../../types/node';

import { OrdercloudConfig } from '../index'

// Get an instance to vercel fetch
const fetch = vercelFetch()

// Get token util
async function getToken({
  baseUrl,
  clientId,
  clientSecret,
}: {
  baseUrl: string
  clientId: string
  clientSecret?: string
}): Promise<string> {
  // If not, get a new one and store it
  const authResponse = await fetch(`${baseUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
  })

  // If something failed getting the auth response
  if (!authResponse.ok) {
    // Get the body of it
    const error = await authResponse.json()

    // And return an error
    throw new FetcherError({
      errors: [{ message: error.error_description.Code }],
      status: error.error_description.HttpStatus,
    })
  }

  // Return the token
  return authResponse
    .json()
    .then((response: { access_token: string }) => response.access_token)
}

export async function fetchData<T>(opts: {
  token: string
  path: string
  method: string
  config: OrdercloudConfig
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
    // Return data response as json
    return (await dataResponse.json()) as Promise<T>
  } catch (error) {
    // If response is empty return it as text
    return null as unknown as Promise<T>
  }
}

export const createMiddlewareFetcher: (
  getConfig: () => OrdercloudConfig
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
    // Get provider config
    const config = getConfig()

    // Get a token
    const token = await getToken({
      baseUrl: config.commerceUrl,
      clientId: process.env.ORDERCLOUD_MIDDLEWARE_CLIENT_ID as string,
      clientSecret: process.env.ORDERCLOUD_MIDDLEWARE_CLIENT_SECRET,
    })

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

export const createBuyerFetcher: (
  getConfig: () => OrdercloudConfig
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
    const customGlobal = global as unknown as CustomNodeJsGlobal;

    // Get provider config
    const config = getConfig()


    // If a token was passed, set it on global
    if (fetchOptions?.token) {
      customGlobal.token = fetchOptions.token
    }

    // Get a token
    if (!customGlobal.token) {
      customGlobal.token = await getToken({
        baseUrl: config.commerceUrl,
        clientId: process.env.ORDERCLOUD_BUYER_CLIENT_ID as string,
      })
    }

    // Return the data and specify the expected type
    const data = await fetchData<T>({
      token: customGlobal.token as string,
      fetchOptions,
      config,
      method,
      path,
      body,
    })

    return {
      ...data,
      meta: { token: customGlobal.token as string },
    }
  }
