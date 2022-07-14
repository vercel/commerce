import type { GraphQLFetcher } from '@vercel/commerce/api'
import fetch from './fetch'

import { API_URL, API_TOKEN } from '../../const'
import { getError } from '../../utils/handle-fetch-response'
import { CommerceError } from '@vercel/commerce/utils/errors'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions
) => {
  try {
    const res = await fetch(API_URL, {
      ...fetchOptions,
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': API_TOKEN!,
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
  } catch (err) {
    // if the error is a CommerceError, we can use it as-is
    if (err instanceof CommerceError) {
      throw err
    } else {
      // otherwise, we'll wrap unknown errors in a CommerceError
      throw getError(
        [
          {
            message: `${err} \n Most likely related to an unexpected output. e.g the store might be protected with password or not available.`,
          },
        ],
        500
      )
    }
  }
}
export default fetchGraphqlApi
