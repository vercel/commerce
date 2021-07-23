// import { FetcherError } from '@commerce/utils/errors'
// import type { GraphQLFetcher } from '@commerce/api'
// import type { BigcommerceConfig } from '../index'

import { GraphQLFetcher, GraphQLFetcherResult } from '@commerce/api'
import { SpreeApiConfig } from '..'
import { errors, makeClient } from '@spree/storefront-api-v2-sdk'
import { requireConfigValue } from 'framework/spree/isomorphicConfig'
import convertSpreeErrorToGraphQlError from 'framework/spree/utils/convertSpreeErrorToGraphQlError'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'
import type {
  JsonApiDocument,
  JsonApiListResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
// import fetch from './fetch'

// const fetchGraphqlApi: (getConfig: () => BigcommerceConfig) => GraphQLFetcher =
//   (getConfig) =>
//   async (query: string, { variables, preview } = {}, fetchOptions) => {
//     // log.warn(query)
//     const config = getConfig()
//     const res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
//       ...fetchOptions,
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${config.apiToken}`,
//         ...fetchOptions?.headers,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query,
//         variables,
//       }),
//     })

//     const json = await res.json()
//     if (json.errors) {
//       throw new FetcherError({
//         errors: json.errors ?? [{ message: 'Failed to fetch Bigcommerce API' }],
//         status: res.status,
//       })
//     }

//     return { data: json.data, res }
//   }

// export default fetchGraphqlApi

const createApiFetch: (
  getConfig: () => SpreeApiConfig
) => GraphQLFetcher<
  GraphQLFetcherResult<JsonApiDocument | JsonApiListResponse>
> = (getConfig) => {
  const client = makeClient({ host: requireConfigValue('spreeApiHost') })

  // FIXME: Allow Spree SDK to use fetch instead of axios.
  return async (query, queryData = {}, fetchOptions = {}) => {
    const url = query
    console.log('ydsfgasgdfagsdf', url)
    const { variables } = queryData
    let prev = null // FIXME:
    const clientEndpointMethod = url
      .split('.')
      .reduce((clientNode: any, pathPart) => {
        prev = clientNode
        //FIXME: use actual type instead of any.
        // TODO: Fix clientNode type
        return clientNode[pathPart]
      }, client)
      .bind(prev)

    console.log('aisdfuiuashdf', clientEndpointMethod)

    const storeResponse: ResultResponse<JsonApiDocument | JsonApiListResponse> =
      await clientEndpointMethod() // FIXME: Not the best to use variables here as it's type is any.
    // await clientEndpointMethod(...variables.args) // FIXME: Not the best to use variables here as it's type is any.

    console.log('87868767868', storeResponse)

    if (storeResponse.success()) {
      return {
        data: storeResponse.success(),
        res: storeResponse as any, //FIXME: MUST BE FETCH RESPONSE
      }
    }

    const storeResponseError = storeResponse.fail()

    if (storeResponseError instanceof errors.SpreeError) {
      throw convertSpreeErrorToGraphQlError(storeResponseError)
    }

    throw storeResponseError
    // throw getError(
    //   [
    //     {
    //       message: `${err} \n Most likely related to an unexpected output. e.g the store might be protected with password or not available.`,
    //     },
    //   ],
    //   500
    // )
    // console.log('jsdkfhjasdf', getConfig())
    // // await
    // return {
    //   data: [],
    //   res: ,
    // }
  }
}

export default createApiFetch

// LOCAL

// fetch<Data = any, Variables = any>(
//   query: string,
//   queryData?: CommerceAPIFetchOptions<Variables>,
//   fetchOptions?: RequestInit
// ): Promise<GraphQLFetcherResult<Data>>

// import { FetcherError } from '@commerce/utils/errors'
// import type { GraphQLFetcher } from '@commerce/api'
// import type { LocalConfig } from '../index'
// import fetch from './fetch'

// const fetchGraphqlApi: (getConfig: () => LocalConfig) => GraphQLFetcher =
//   (getConfig) =>
//   async (query: string, { variables, preview } = {}, fetchOptions) => {
//     const config = getConfig()
//     const res = await fetch(config.commerceUrl, {
//       ...fetchOptions,
//       method: 'POST',
//       headers: {
//         ...fetchOptions?.headers,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query,
//         variables,
//       }),
//     })

//     const json = await res.json()
//     if (json.errors) {
//       throw new FetcherError({
//         errors: json.errors ?? [{ message: 'Failed to fetch for API' }],
//         status: res.status,
//       })
//     }

//     return { data: json.data, res }
//   }

// export default fetchGraphqlApi
