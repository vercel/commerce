import { GraphQLFetcher, GraphQLFetcherResult } from '@commerce/api'
import { SpreeApiConfig } from '..'
import { errors, makeClient } from '@spree/storefront-api-v2-sdk'
import { requireConfigValue } from 'framework/spree/isomorphicConfig'
import convertSpreeErrorToGraphQlError from 'framework/spree/utils/convertSpreeErrorToGraphQlError'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'
import type {
  JsonApiListResponse,
  JsonApiResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import getSpreeSdkMethodFromEndpointPath from 'framework/spree/utils/getSpreeSdkMethodFromEndpointPath'
import { SpreeSdkVariables } from 'framework/spree/types'
import SpreeSdkMethodFromEndpointPathError from 'framework/spree/errors/SpreeSdkMethodFromEndpointPathError'

const createApiFetch: (
  getConfig: () => SpreeApiConfig
) => GraphQLFetcher<GraphQLFetcherResult<any>, SpreeSdkVariables> = (
  getConfig
) => {
  const client = makeClient({ host: requireConfigValue('spreeApiHost') })

  return async (url, queryData = {}, fetchOptions = {}) => {
    console.log(
      'apiFetch called. query = ',
      'url = ',
      url,
      'queryData = ',
      queryData,
      'fetchOptions = ',
      fetchOptions
    )

    const { variables } = queryData

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
}

export default createApiFetch
