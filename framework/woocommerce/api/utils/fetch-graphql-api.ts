import type { GraphQLFetcher } from '@commerce/api'
import fetch from './fetch'

import { API_URL } from '../../const'
import { getError } from '../../utils/handle-fetch-response'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions
) => {
  const res = await fetch(API_URL, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const result = await res.json()

  return result
}
export default fetchGraphqlApi
