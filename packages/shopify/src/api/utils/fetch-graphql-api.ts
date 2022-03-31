import type { GraphQLFetcher } from '@vercel/commerce/api'
import fetch from './fetch'

import {
  STOREFRONT_API_URL,
  ADMIN_API_URL,
  API_TOKEN,
  ADMIN_ACCESS_TOKEN,
} from '../../const'
import { getError } from '../../utils/handle-fetch-response'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions,
  useAdminApi = false
) => {
  try {
    if (useAdminApi) {
      console.log('graphQL fetch from admin api')

      const res = await fetch(ADMIN_API_URL, {
        ...fetchOptions,
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN!,
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
    } else {
      console.log('graphQL fetch from storefront api')

      const res = await fetch(STOREFRONT_API_URL, {
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
    }
  } catch (err) {
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
export default fetchGraphqlApi
