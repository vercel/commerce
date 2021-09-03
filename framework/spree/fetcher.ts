import type { Fetcher } from '@commerce/utils/types'
import convertSpreeErrorToGraphQlError from './utils/convert-spree-error-to-graph-ql-error'
import { makeClient } from '@spree/storefront-api-v2-sdk'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'
import { errors } from '@spree/storefront-api-v2-sdk'
import { requireConfigValue } from './isomorphic-config'
import getSpreeSdkMethodFromEndpointPath from './utils/get-spree-sdk-method-from-endpoint-path'
import SpreeSdkMethodFromEndpointPathError from './errors/SpreeSdkMethodFromEndpointPathError'
import type {
  SpreeSdkResponse,
  SpreeSdkResponseWithRawResponse,
  SpreeSdkVariables,
} from './types'
import type { GraphQLFetcherResult } from '@commerce/api'
import createCustomizedFetchFetcher, {
  fetchResponseKey,
} from './utils/create-customized-fetch-fetcher'

const client = makeClient({
  host: requireConfigValue('apiHost') as string,
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
  GraphQLFetcherResult<SpreeSdkResponse>,
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
    throw convertSpreeErrorToGraphQlError(storeResponseError)
  }

  throw storeResponseError
}

export default fetcher
