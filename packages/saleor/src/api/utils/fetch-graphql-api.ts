import type { FetchOptions, GraphQLFetcher } from '@vercel/commerce/api'

import { API_URL } from '../../const'
import { getError } from '../../utils/handle-fetch-response'
import { getToken } from '../../utils/index'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  options?: FetchOptions
) => {
  const token = getToken()

  const res = await fetch(API_URL!, {
    method: options?.method || 'POST',
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...options?.body,
      query,
      variables,
    }),
  })

  const { data, errors, message, type, status } = await res.json()

  if (errors || res.status >= 400) {
    throw getError(
      errors || [
        {
          message: `${type ? `${type}, ` : ''}${message}`,
        },
      ],
      status || res.status
    )
  }

  return { data, res }
}
export default fetchGraphqlApi
