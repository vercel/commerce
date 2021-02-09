import { Fetcher, HookHandler } from '@commerce/utils/types'
import {
  API_TOKEN,
  API_URL,
  SHOPIFY_CHECKOUT_ID_COOKIE,
  STORE_DOMAIN,
} from './const'
import { normalizeCart } from './lib/normalize'
import { Cart } from './types'

import handleFetchResponse from './utils/handle-fetch-response'

const useCart: HookHandler<
  Cart | null,
  [],
  any,
  any,
  any,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    url: '/api/bigcommerce/cart',
    method: 'GET',
  },
  swrOptions: {
    revalidateOnFocus: false,
  },
  normalizer: normalizeCart,
  onResponse(response) {
    return Object.create(response, {
      isEmpty: {
        get() {
          return (response.data?.lineItems.length ?? 0) <= 0
        },
        enumerable: true,
      },
    })
  },
}

const fetcher: Fetcher = async ({ method = 'GET', variables, query }) => {
  return handleFetchResponse(
    await fetch(API_URL, {
      method,
      body: JSON.stringify({ query, variables }),
      headers: {
        'X-Shopify-Storefront-Access-Token': API_TOKEN!,
        'Content-Type': 'application/json',
      },
    })
  )
}

export const shopifyProvider = {
  locale: 'en-us',
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  storeDomain: STORE_DOMAIN,
  fetcher,
  cartNormalizer: normalizeCart,
  cart: { useCart },
}

export type ShopifyProvider = typeof shopifyProvider
