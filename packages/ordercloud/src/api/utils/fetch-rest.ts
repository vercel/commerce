import { FetcherError } from '@vercel/commerce/utils/errors'
import { OrdercloudConfig } from '../index'

export let token: string | null = null

// Get token util
async function getToken({
  baseUrl,
  clientId,
  clientSecret,
}: {
  baseUrl: string
  clientId: string
  clientSecret?: string
}): Promise<{
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}> {
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

    console.log(JSON.stringify(error, null, 2))

    // And return an error
    throw new FetcherError({
      errors: [{ message: error.error_description.Code }],
      status: error.error_description.HttpStatus,
    })
  }

  // Return the token
  return authResponse.json()
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
    let errors

    try {
      // Get the body of it
      const error = await dataResponse.json()
      errors = error.Errors
    } catch (e) {
      const message = await dataResponse.text()
      errors = [{ message }]
    }
    throw new FetcherError({
      errors,
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
    if (fetchOptions?.token) {
      token = fetchOptions?.token
    }

    // Get provider config
    const config = getConfig()

    let meta: any = {}

    if (!token) {
      const newToken = await getToken({
        baseUrl: config.commerceUrl,
        clientId: process.env.ORDERCLOUD_BUYER_CLIENT_ID as string,
      })
      token = newToken.access_token
      meta.token = newToken
    }

    // Return the data and specify the expected type
    const data = await fetchData<T>({
      token,
      fetchOptions,
      config,
      method,
      path,
      body,
    })

    return {
      ...data,
      meta,
    }
  }
