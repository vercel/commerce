import { FetcherError } from '@vercel/commerce/utils/errors'
import { OrdercloudConfig } from '../index'

export type GetTokenParams = (
  | {
      grantType: 'password'
      username: string
      password: string
    }
  | { grantType: 'client_credentials' }
) & {
  baseUrl: string
  clientId: string
  clientSecret?: string
}

// Get token util
export async function getToken(params: GetTokenParams): Promise<{
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}> {
  let body = `client_id=${params.clientId}&client_secret=${params.clientSecret}&grant_type=${params.grantType}`
  if (params.grantType === 'password') {
    body += `&username=${params.username}&password=${params.password}`
  }

  // If not, get a new one and store it
  const authResponse = await fetch(`${params.baseUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body,
  })

  // If something failed getting the auth response
  if (!authResponse.ok) {
    // Get the body of it
    const error = await authResponse.json()

    console.log(JSON.stringify(error, null, 2))

    // And return an error
    throw new FetcherError({
      errors: [
        {
          message:
            typeof error.error_description === 'object'
              ? error.error_description.Code
              : error.error_description,
        },
      ],
      status:
        typeof error.error_description === 'object'
          ? error.error_description.HttpStatus
          : undefined,
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

  let url = `${config.commerceUrl}/${config.apiVersion}${path}`
  if (fetchOptions?.anonToken) {
    url += `?anonUserToken=${encodeURIComponent(token)}`
  }

  // Do the request with the correct headers
  const dataResponse = await fetch(url, {
    ...fetchOptions,
    method,
    headers: {
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain, */*',
      authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

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

export const getFetchConfig = (config: OrdercloudConfig) => ({
  baseUrl: config.commerceUrl,
  clientId: process.env.ORDERCLOUD_BUYER_CLIENT_ID as string,
})

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
    let token: string | null = null

    if (fetchOptions?.token) {
      token = fetchOptions?.token
    }

    // Get provider config
    const config = getConfig()

    let meta: any = {}

    if (!token) {
      const newToken = await getToken({
        grantType: 'client_credentials',
        ...getFetchConfig(config),
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
