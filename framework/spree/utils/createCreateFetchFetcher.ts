import * as qs from 'qs'
import { errors } from '@spree/storefront-api-v2-sdk'
import type { CreateFetcher } from '@spree/storefront-api-v2-sdk/types/interfaces/ClientConfig'
import { Request } from 'node-fetch'

// TODO: Fix rawFetch any type.
const createCreateFetchFetcher =
  ({ fetch: rawFetch }): CreateFetcher =>
  (fetcherOptions) => {
    const { FetchError } = errors
    const sharedHeaders = {
      'Content-Type': 'application/json',
    }

    return {
      fetch: async (fetchOptions) => {
        // This fetcher always returns request equal null,
        // because @vercel/fetch doesn't accept a Request object as argument
        // and it's not used by NJC anyway.
        try {
          const { url, params, method, headers } = fetchOptions
          const absoluteUrl = new URL(url, fetcherOptions.host)
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

          try {
            const response = await rawFetch(absoluteUrl.toString(), {
              method,
              headers: { ...sharedHeaders, ...headers },
              ...payload,
            })

            const data = await response.json()

            if (!response.ok) {
              // Use the "traditional" approach and reject non 2xx responses.
              throw new FetchError(response, null, data)
            }

            return {
              // Add response key to the prototype so it can be passed inside the GraphQLFetcherResult type.
              // TODO: Search for a better solution than adding response to the prototype.
              data: Object.setPrototypeOf({ data }, { response }),
            }
          } catch (error) {
            if (error instanceof TypeError) {
              throw new FetchError(null, null, null)
            }

            throw error
          }
        } catch (error) {
          throw new FetchError(null, null, null, error.message)
        }
      },
    }
  }

export default createCreateFetchFetcher
