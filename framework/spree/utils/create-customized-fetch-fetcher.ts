import * as qs from 'qs'
import { errors } from '@spree/storefront-api-v2-sdk'
import type { CreateCustomizedFetchFetcher } from '@spree/storefront-api-v2-sdk/types/interfaces/CreateCustomizedFetchFetcher'

export const fetchResponseKey = Symbol('fetch-response-key')

const createCustomizedFetchFetcher: CreateCustomizedFetchFetcher = (
  fetcherOptions
) => {
  const { FetchError } = errors
  const sharedHeaders = {
    'Content-Type': 'application/json',
  }

  const { host, fetch, requestConstructor } = fetcherOptions

  return {
    fetch: async (fetchOptions) => {
      // This fetcher always returns request equal null,
      // because @vercel/fetch doesn't accept a Request object as argument
      // and it's not used by NJC anyway.
      try {
        const { url, params, method, headers } = fetchOptions
        const absoluteUrl = new URL(url, host)
        let payload

        switch (method.toUpperCase()) {
          case 'PUT':
          case 'POST':
          case 'DELETE':
          case 'PATCH':
            payload = { body: JSON.stringify(params) }
            break
          default:
            payload = null
            absoluteUrl.search = qs.stringify(params, {
              arrayFormat: 'brackets',
            })
        }

        const request: Request = new requestConstructor(
          absoluteUrl.toString(),
          {
            method: method.toUpperCase(),
            headers: { ...sharedHeaders, ...headers },
            ...payload,
          }
        )

        try {
          const response: Response = await fetch(request)
          const responseContentType = response.headers.get('content-type')
          let data

          if (
            !responseContentType ||
            (!responseContentType.includes('application/json') &&
              !responseContentType.includes('application/vnd.api+json'))
          ) {
            data = await response.text()
          } else {
            data = await response.json()
          }

          if (!response.ok) {
            // Use the "traditional" approach and reject non 2xx responses.
            throw new FetchError(response, request, data)
          }

          data[fetchResponseKey] = response

          return { data }
        } catch (error) {
          if (error instanceof FetchError) {
            throw error
          }

          throw new FetchError(null, request, null, error.message)
        }
      } catch (error) {
        if (error instanceof FetchError) {
          throw error
        }

        throw new FetchError(null, null, null, error.message)
      }
    },
  }
}

export default createCustomizedFetchFetcher
