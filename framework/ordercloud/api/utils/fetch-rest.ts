import type { OrdercloudConfig } from '../index'

import { FetcherError } from '@commerce/utils/errors'
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

    async function getToken() {
      // If not, get a new one and store it
      const authResponse = await fetch(`${commerceUrl}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: `client_id=${process.env.NEXT_PUBLIC_ORDERCLOUD_CLIENT_ID}&grant_type=client_credentials&client_secret=${process.env.NEXT_PUBLIC_ORDERCLOUD_CLIENT_SECRET}`,
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

      // If everything is fine, store the access token in global.token
      global.token = await authResponse
        .json()
        .then((response) => response.access_token)
    }

    async function fetchData(retries = 0): Promise<T> {
      // Do the request with the correct headers
      const dataResponse = await fetch(`${commerceUrl}/v1${resource}`, {
        ...fetchOptions,
        method,
        headers: {
          ...fetchOptions?.headers,
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${global.token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      // If something failed getting the data response
      if (!dataResponse.ok) {
        // If token is expired
        if (dataResponse.status === 401) {
          // Reset it
          global.token = null

          // Get a new one
          await getToken()

          // And if retries left
          if (retries < 2) {
            // Refetch
            return fetchData(retries + 1)
          }
        }

        // Get the body of it
        const error = await dataResponse.json()

        // And return an error
        throw new FetcherError({
          errors: [{ message: error.error_description.Code }],
          status: error.error_description.HttpStatus,
        })
      }

      // Return data response
      return dataResponse.json() as Promise<T>
    }

    // Check if we have a token stored
    if (!global.token) {
      // If not, get a new one and store it
      await getToken()
    }

    // Return the data and specify the expected type
    return fetchData()
  }

export default fetchRestApi
