import type { GraphQLFetcher } from '@commerce/api'
import fetch from './fetch'

import { API_URL } from '../../const'
import { getError } from '../../utils/handle-fetch-response'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions
) => {
  try {
    console.log({
      resss: {
        API_URL,
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
      },
    })

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

    const { data, errors, status } = await res.json()

    if (errors) {
      console.log({ errors: errors[0].extensions })
      console.log(getError(errors, status))
    }

    return { data, res }
  } catch (err) {
    console.log({ err })
    console.log(
      getError(
        [
          {
            message: `${err} \n Most likely related to an unexpected output. e.g the store might be protected with password or not available.`,
          },
        ],
        500
      )
    )
  }
}
export default fetchGraphqlApi
