import type { GraphQLFetcher } from '@commerce/api'
import fetch from './fetch'

import { API_URL } from '../../const'
import { getError } from '../../utils/handle-fetch-response'
import { getCommerceApi } from '..'
import { getToken } from '../../utils/index'

const fetchGraphqlApi: GraphQLFetcher = async (query: string, { variables } = {}, fetchOptions) => {
  const config = getCommerceApi().getConfig()
  const token = getToken()

  const res = await fetch(API_URL!, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const { data, errors, status } = await res.json()

  if (errors) {
    throw getError(errors, status)
  }

  return { data, res }
}
export default fetchGraphqlApi
