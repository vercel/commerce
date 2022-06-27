import { Fetcher } from '@vercel/commerce/utils/types'
import client from './commercetools'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { COMMERCETOOLS_PROJECT_KEY } from './const'
import { FetcherError } from '@vercel/commerce/utils/errors'

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText
  } catch (error) {
    return res.statusText
  }
}

async function getError(res: Response) {
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const data = await res.json()
    return new FetcherError({ errors: data.errors, status: res.status })
  }
  return new FetcherError({ message: await getText(res), status: res.status })
}

export const clientFetcher: Fetcher = async ({
  url,
  method = 'GET',
  variables,
  body: bodyObj,
}) => {
  const hasBody = Boolean(variables || bodyObj)
  const body = hasBody
    ? JSON.stringify(variables ? { variables } : bodyObj)
    : undefined
  const headers = hasBody ? { 'Content-Type': 'application/json' } : undefined
  const res = await fetch(url!, { method, body, headers })

  if (res.ok) {
    const { data } = await res.json()
    return data
  }

  throw await getError(res)
}

const sdkFetcher: Fetcher = async ({ method, variables, query, body }) => {
  const apiRoot = createApiBuilderFromCtpClient(client.client).withProjectKey({
    projectKey: COMMERCETOOLS_PROJECT_KEY!,
  })

  if (query === 'login') {
    return apiRoot
      .login()
      .post({
        body,
      })
      .execute()
      .then((response) => response)
      .catch((response) => {
        throw new FetcherError({
          status: response.statusCode,
          message: response.body.message,
        })
      })
  } else if (query === 'productProjections') {
    const initialQueryBuilder = apiRoot[query]()

    const queryBuilderWithId = variables?.id
      ? initialQueryBuilder.withId({ ID: variables.id })
      : initialQueryBuilder.search()

    return await queryBuilderWithId[method as 'get']({
      queryArgs: {
        expand: variables?.expand,
        limit: variables?.limit,
        ...(variables?.sort ? { sort: variables.sort } : {}),
        ...(variables?.search ? variables.search : {}),
        ...(variables?.filters ? { filter: variables.filters } : {}),
      },
    })
      .execute()
      .then((response) => response)
      .catch((response) => {
        throw new FetcherError({
          status: response.statusCode,
          message: response.body.message,
        })
      })
  } else {
    const initialQueryBuilder =
      apiRoot[query as 'categories' | 'carts' | 'products' | 'customers']()

    const queryBuilderWithId = variables?.id
      ? initialQueryBuilder.withId({ ID: variables.id })
      : initialQueryBuilder

    return await queryBuilderWithId[method as 'post' | 'get']({
      body,
      queryArgs: {
        ...(variables?.where ? { where: variables.where } : {}),
      },
    })
      .execute()
      .then((response) => response)
      .catch((response) => {
        throw new FetcherError({
          status: response.statusCode,
          message: response.body.message,
        })
      })
  }
}

export default sdkFetcher
