import type { GraphQLFetcher } from '@vercel/commerce/api'

import { API_URL } from '../../const'
import { getError } from '../../utils/handle-fetch-response'
import { getCommerceApi } from '..'
import { getToken } from '../../utils/index'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  headers?: HeadersInit
) => {
  const config = getCommerceApi().getConfig()
  const token = getToken()

  const res = await fetch(API_URL!, {
    method: 'POST',
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...headers,
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
