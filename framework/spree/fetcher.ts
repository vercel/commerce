import type { Fetcher } from '@commerce/utils/types'
import convertSpreeErrorToGraphQlError from './utils/convert-spree-error-to-graph-ql-error'
import { makeClient } from '@spree/storefront-api-v2-sdk'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'
import type {
  JsonApiListResponse,
  JsonApiSingleResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import { errors } from '@spree/storefront-api-v2-sdk'
import { requireConfigValue } from './isomorphic-config'
import getSpreeSdkMethodFromEndpointPath from './utils/get-spree-sdk-method-from-endpoint-path'
import SpreeSdkMethodFromEndpointPathError from './errors/SpreeSdkMethodFromEndpointPathError'
import type { SpreeSdkVariables } from './types'
import type { GraphQLFetcherResult } from '@commerce/api'
import createCustomizedFetchFetcher from './utils/create-customized-fetch-fetcher'

const client = makeClient({
  host: requireConfigValue('spreeApiHost') as string,
  fetcherType: 'custom',
  createFetcher: (fetcherOptions) => {
    return createCustomizedFetchFetcher({
      fetch: globalThis.fetch,
      requestConstructor: globalThis.Request,
      ...fetcherOptions,
    })
  },
})

const fetcher: Fetcher<
  GraphQLFetcherResult<JsonApiSingleResponse | JsonApiListResponse>,
  SpreeSdkVariables
> = async (requestOptions) => {
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

export default fetcher
