import type { FetchOptions, GraphQLFetcher } from '@vercel/commerce/api'

import { API_URL, API_TOKEN } from '../../const'
import { getError } from '../../utils/handle-fetch-response'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  options?: FetchOptions
) => {
  try {
    const res = await fetch(API_URL, {
      method: options?.method || 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': API_TOKEN!,
        ...options?.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...options?.body,
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
    throw getError(
      [
        {
          message: `${err} \n Most likely related to an unexpected output. E.g: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN & NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN might be incorect.`,
        },
      ],
      500
    )
  }
}
export default fetchGraphqlApi
