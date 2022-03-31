import { Fetcher } from '@vercel/commerce/utils/types'
import {
  API_TOKEN,
  STOREFRONT_API_URL,
  ADMIN_ACCESS_TOKEN,
  ADMIN_API_URL,
} from './const'
import { handleFetchResponse } from './utils'

const fetcher: Fetcher = async ({
  url = STOREFRONT_API_URL,
  method = 'POST',
  variables,
  query,
  useAdminApi = false,
}) => {
  const { locale, ...vars } = variables ?? {}

  if (method === 'POST' || method === 'DELETE') {
    if (useAdminApi) {
      url = ADMIN_API_URL
      console.log('admin api', url, query, method)

      return handleFetchResponse(
        await fetch(url, {
          method,
          body: JSON.stringify({ query, variables: vars }),
          headers: {
            'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN!,
            'Content-Type': 'application/json',
            ...(locale && {
              'Accept-Language': locale,
            }),
          },
        })
      )
    } else {
      console.log('storefront api:', url, query, method)
      return handleFetchResponse(
        await fetch(url, {
          method,
          body: JSON.stringify({ query, variables: vars }),
          headers: {
            'X-Shopify-Storefront-Access-Token': API_TOKEN!,
            'Content-Type': 'application/json',
            ...(locale && {
              'Accept-Language': locale,
            }),
          },
        })
      )
    }
  }

  return handleFetchResponse(await fetch(url))
}

export default fetcher
