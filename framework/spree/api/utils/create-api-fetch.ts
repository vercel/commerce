import { SpreeApiConfig } from '..'
import { errors, makeClient } from '@spree/storefront-api-v2-sdk'
import { requireConfigValue } from '@framework/isomorphic-config'
import convertSpreeErrorToGraphQlError from '@framework/utils/convert-spree-error-to-graph-ql-error'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'
import type {
  JsonApiListResponse,
  JsonApiSingleResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import getSpreeSdkMethodFromEndpointPath from '@framework/utils/get-spree-sdk-method-from-endpoint-path'
import { SpreeSdkVariables } from 'framework/spree/types'
import SpreeSdkMethodFromEndpointPathError from 'framework/spree/errors/SpreeSdkMethodFromEndpointPathError'
import { GraphQLFetcher, GraphQLFetcherResult } from '@commerce/api'
import createCustomizedFetchFetcher from '@framework/utils/create-customized-fetch-fetcher'
import fetch, { Request } from 'node-fetch'

const createApiFetch: (
  getConfig: () => SpreeApiConfig
) => GraphQLFetcher<GraphQLFetcherResult<any>, SpreeSdkVariables> = (
  _getConfig
) => {
  const client = makeClient({
    host: requireConfigValue('apiHost') as string,
    fetcherType: 'custom',
    createFetcher: (fetcherOptions) => {
      return createCustomizedFetchFetcher({
        fetch,
        requestConstructor: Request,
        ...fetcherOptions,
      })
    },
  })

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

    const storeResponse: ResultResponse<
      JsonApiSingleResponse | JsonApiListResponse
    > = await getSpreeSdkMethodFromEndpointPath(
      client,
      variables.methodPath
    )(...variables.arguments)

    if (storeResponse.isSuccess()) {
      const data = storeResponse.success()
      const rawFetchRespone = Object.getPrototypeOf(data).response

      return {
        data,
        res: rawFetchRespone,
      }
    }

    const storeResponseError = storeResponse.fail()

    if (storeResponseError instanceof errors.SpreeError) {
      throw convertSpreeErrorToGraphQlError(storeResponseError)
    }

    throw storeResponseError
  }
}

export default createApiFetch
