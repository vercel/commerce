import { SpreeApiConfig } from '..'
import { errors, makeClient } from '@spree/storefront-api-v2-sdk'
import { requireConfigValue } from '../../isomorphic-config'
import convertSpreeErrorToGraphQlError from '../../utils/convert-spree-error-to-graph-ql-error'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'
import getSpreeSdkMethodFromEndpointPath from '../../utils/get-spree-sdk-method-from-endpoint-path'
import SpreeSdkMethodFromEndpointPathError from '../../errors/SpreeSdkMethodFromEndpointPathError'
import { GraphQLFetcher, GraphQLFetcherResult } from '@vercel/commerce/api'
import createCustomizedFetchFetcher, {
  fetchResponseKey,
} from '../../utils/create-customized-fetch-fetcher'
import fetch, { Request } from 'node-fetch'
import type { SpreeSdkResponseWithRawResponse } from '../../types'
import prettyPrintSpreeSdkErrors from '../../utils/pretty-print-spree-sdk-errors'

export type CreateApiFetch = (
  getConfig: () => SpreeApiConfig
) => GraphQLFetcher<GraphQLFetcherResult<any>, any>

// TODO: GraphQLFetcher<GraphQLFetcherResult<any>, any> should be GraphQLFetcher<GraphQLFetcherResult<any>, SpreeSdkVariables>.
// But CommerceAPIConfig['fetch'] cannot be extended from Variables = any to SpreeSdkVariables.

const createApiFetch: CreateApiFetch = (_getConfig) => {
  const client = makeClient({
    host: requireConfigValue('apiHost') as string,
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

    const storeResponse: ResultResponse<SpreeSdkResponseWithRawResponse> =
      await getSpreeSdkMethodFromEndpointPath(
        client,
        variables.methodPath
      )(...variables.arguments)

    if (storeResponse.isSuccess()) {
      const data = storeResponse.success()
      const rawFetchResponse = data[fetchResponseKey]

      return {
        data,
        res: rawFetchResponse,
      }
    }

    const storeResponseError = storeResponse.fail()

    if (storeResponseError instanceof errors.SpreeError) {
      console.error(
        `Request to spree resulted in an error:\n\n${prettyPrintSpreeSdkErrors(
          storeResponse.fail()
        )}`
      )

      throw convertSpreeErrorToGraphQlError(storeResponseError)
    }

    throw storeResponseError
  }
}

export default createApiFetch
