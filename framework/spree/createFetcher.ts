import type { Fetcher } from '@commerce/utils/types'
import convertSpreeErrorToGraphQlError from './utils/convertSpreeErrorToGraphQlError'
import { makeClient } from '@spree/storefront-api-v2-sdk'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'
import type {
  JsonApiDocument,
  JsonApiListResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import { errors } from '@spree/storefront-api-v2-sdk'
// import { API_TOKEN, API_URL } from './const'
// import { handleFetchResponse } from './utils'

const createFetcher = (fetcherOptions: any): Fetcher => {
  const { host } = fetcherOptions
  const client = makeClient({ host })

  //TODO: Add types to fetcherOptions
  return async (requestOptions) => {
    console.log('FETCHER')
    // url?: string
    // query?: string
    // method?: string
    // variables?: any
    // body?: Body
    const { url, method, variables, query } = requestOptions
    const { locale, ...vars } = variables ?? {}

    if (!url) {
      // TODO: Create a custom type for this error.
      throw new Error('Url not provider for fetcher.')
    }

    console.log(
      `Fetching products using options: ${JSON.stringify(requestOptions)}.`
    )

    // const storeResponse = await fetch(url, {
    // method,
    // body: JSON.stringify({ query, variables: vars }),
    // headers: {
    // 'X-Shopify-Storefront-Access-Token': API_TOKEN,
    // 'Content-Type': 'application/json', TODO: Probably not needed. Check!
    // },
    // })

    // const storeResponse.json()

    // if (storeResponse.ok) {
    //   return
    // }

    // TODO: Not best to use url for finding the method, but should be good enough for now.

    const clientEndpointMethod = url
      .split('.')
      .reduce((clientNode: any, pathPart) => {
        // TODO: Fix clientNode type
        return clientNode[pathPart]
      }, client)

    const storeResponse: ResultResponse<JsonApiDocument | JsonApiListResponse> =
      await clientEndpointMethod(...variables.args) // TODO: Not the best to use variables here as it's type is any.

    if (storeResponse.success()) {
      return storeResponse.success()
    }

    if (storeResponse.fail() instanceof errors.SpreeError) {
      throw convertSpreeErrorToGraphQlError(storeResponse.fail())
    }

    throw storeResponse.fail()
  }
}

// import { Fetcher } from '@commerce/utils/types'

// export const fetcher: Fetcher = async () => {
//   console.log('FETCHER')
//   const res = await fetch('./data.json')
//   if (res.ok) {
//     const { data } = await res.json()
//     return data
//   }
//   throw res
// }

export default createFetcher
