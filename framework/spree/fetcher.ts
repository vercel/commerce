import type { Fetcher } from '@commerce/utils/types'
import convertSpreeErrorToGraphQlError from './utils/convertSpreeErrorToGraphQlError'
import { makeClient } from '@spree/storefront-api-v2-sdk'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'
import type {
  JsonApiListResponse,
  JsonApiResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import { errors } from '@spree/storefront-api-v2-sdk'
import { requireConfigValue } from './isomorphicConfig'
import getSpreeSdkMethodFromEndpointPath from './utils/getSpreeSdkMethodFromEndpointPath'
// import { handleFetchResponse } from './utils'

const client = makeClient({ host: requireConfigValue('spreeApiHost') })

const fetcher: Fetcher = async (requestOptions) => {
  console.log('Fetcher called')
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

  // TODO: Not best to use url for finding the method, but should be good enough for now.

  const storeResponse: ResultResponse<JsonApiResponse | JsonApiListResponse> =
    await getSpreeSdkMethodFromEndpointPath(client, url)(...variables.args) // TODO: Not the best to use variables here as it's type is any.

  if (storeResponse.success()) {
    return storeResponse.success()
  }

  const storeResponseError = storeResponse.fail()

  if (storeResponseError instanceof errors.SpreeError) {
    throw convertSpreeErrorToGraphQlError(storeResponseError)
  }

  throw storeResponseError
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

export default fetcher
