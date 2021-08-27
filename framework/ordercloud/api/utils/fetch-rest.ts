import vercelFetch from '@vercel/fetch'
import { FetcherError } from '@commerce/utils/errors'
import jwt from 'jsonwebtoken'

import { OrdercloudConfig } from '../index'

// Get an instance to vercel fetch
const fetch = vercelFetch()

// Get token util
async function getToken(baseUrl: string) {
  // If not, get a new one and store it
  const authResponse = await fetch(`${baseUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: `client_id=${process.env.NEXT_PUBLIC_ORDERCLOUD_CLIENT_ID}&grant_type=client_credentials`,
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
  return authResponse.json().then((response) => response.access_token)
}

export async function fetchData<T>(
  opts: {
    path: string
    method: string
    baseUrl: string
    apiVersion: string
    fetchOptions?: Record<string, any>
    body?: Record<string, unknown>
  },
  retries = 0
): Promise<T> {
  // Destructure opts
  const { path, body, fetchOptions, baseUrl, apiVersion, method = 'GET' } = opts

  // Decode token
  const decoded = jwt.decode(global.token as string) as jwt.JwtPayload | null

  // If token is not present or its expired, get a new one and store it
  if (
    !global.token ||
    (typeof decoded?.exp === 'number' && decoded?.exp * 1000 < +new Date())
  ) {
    // Get a new one
    const token = await getToken(baseUrl)

    // Store it
    global.token = token
  }

  // Do the request with the correct headers
  const dataResponse = await fetch(`${baseUrl}/${apiVersion}${path}`, {
    ...fetchOptions,
    method,
    headers: {
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain, */*',
      authorization: `Bearer ${global.token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  // If something failed getting the data response
  if (!dataResponse.ok) {
    // If token is expired
    if (dataResponse.status === 401) {
      // Get a new one
      const token = await getToken(baseUrl)

      // Store it
      global.token = token
    }

    // And if retries left
    if (retries < 2) {
      // Refetch
      return fetchData(opts, retries + 1)
    }

    // Get the body of it
    const error = await dataResponse.json()

    // And return an error
    throw new FetcherError({
      errors: [{ message: error.error_description.Code }],
      status: error.error_description.HttpStatus,
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

const serverFetcher: (
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
    const { commerceUrl, apiVersion } = getConfig()

    // Return the data and specify the expected type
    return fetchData<T>({
      fetchOptions,
      method,
      baseUrl: commerceUrl,
      apiVersion,
      path,
      body,
    })
  }

export default serverFetcher
