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
import SpreeSdkMethodFromEndpointPathError from './errors/SpreeSdkMethodFromEndpointPathError'
import type { SpreeSdkVariables } from './types'
import { GraphQLFetcherResult } from '@commerce/api'

const client = makeClient({ host: requireConfigValue('spreeApiHost') })

const fetcher: Fetcher<GraphQLFetcherResult<any>, SpreeSdkVariables> = async (
  requestOptions
) => {
  // url?: string
  // query?: string
  // method?: string
  // variables?: any
  // body?: Body
  const { url, method, variables, query } = requestOptions
  const { locale, ...vars } = variables ?? {}

  console.log(
    'Fetcher called. Configuration: ',
    'url = ',
    url,
    'requestOptions = ',
    requestOptions
  )

  if (!variables) {
    throw new SpreeSdkMethodFromEndpointPathError(
      `Required SpreeSdkVariables not provided.`
    )
  }

  const storeResponse: ResultResponse<JsonApiResponse | JsonApiListResponse> =
    await getSpreeSdkMethodFromEndpointPath(
      client,
      variables.methodPath
    )(...variables.arguments)

  if (storeResponse.success()) {
    return {
      data: storeResponse.success(),
      res: storeResponse as any, //FIXME: MUST BE fetch() RESPONSE instead of axios.
    }
  }

  // FIXME: Allow Spree SDK to use fetch instead of axios
  // (https://github.com/spree/spree-storefront-api-v2-js-sdk/issues/189)

  const storeResponseError = storeResponse.fail()

  if (storeResponseError instanceof errors.SpreeError) {
    throw convertSpreeErrorToGraphQlError(storeResponseError)
  }

  throw storeResponseError
}

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
