import {
  errors,
  request as spreeSdkRequestHelpers,
} from '@spree/storefront-api-v2-sdk'
import type { CreateCustomizedFetchFetcher } from '@spree/storefront-api-v2-sdk/types/interfaces/CreateCustomizedFetchFetcher'
import isJsonContentType from './is-json-content-type'

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
        const { url, params, method, headers, responseParsing } = fetchOptions
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
            absoluteUrl.search =
              spreeSdkRequestHelpers.objectToQuerystring(params)
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

          if (responseParsing === 'automatic') {
            if (responseContentType && isJsonContentType(responseContentType)) {
              data = await response.json()
            } else {
              data = await response.text()
            }
          } else if (responseParsing === 'text') {
            data = await response.text()
          } else if (responseParsing === 'json') {
            data = await response.json()
          } else if (responseParsing === 'stream') {
            data = await response.body
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

          if (!(error instanceof Error)) {
            throw error
          }

          throw new FetchError(null, request, null, error.message)
        }
      } catch (error) {
        if (error instanceof FetchError) {
          throw error
        }

        if (!(error instanceof Error)) {
          throw error
        }

        throw new FetchError(null, null, null, error.message)
      }
    },
  }
}

export default createCustomizedFetchFetcher
