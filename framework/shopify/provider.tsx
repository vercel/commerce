import { useMemo } from 'react'
import { Fetcher, HookFetcherFn, HookHandler } from '@commerce/utils/types'

import {
  API_TOKEN,
  API_URL,
  SHOPIFY_CHECKOUT_ID_COOKIE,
  STORE_DOMAIN,
} from './const'

import { Cart } from './types'
import { normalizeCart } from './lib/normalize'
import handleFetchResponse from './utils/handle-fetch-response'
import getCheckoutQuery from './utils/queries/get-checkout-query'
import { FetchCartInput, UseCartInput } from '@commerce/cart/use-cart'
import { checkoutCreate, checkoutToCart } from './cart/utils'

const fetcher: Fetcher = async ({ method = 'POST', variables, query }) => {
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

export const cartFetcher: HookFetcherFn<Cart | null, FetchCartInput> = async ({
  options,
  input: { cartId },
  fetch,
}) => {
  let checkout

  if (cartId) {
    const data = await fetch({
      ...options,
      variables: {
        cartId,
      },
    })
    checkout = data?.node
  }

  if (checkout?.completedAt || !cartId) {
    checkout = await checkoutCreate(fetch)
  }

  return checkoutToCart({ checkout })
}

const useCart: HookHandler<
  Cart | null,
  {},
  any,
  any,
  any,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  fetcher: cartFetcher,
  normalizer: normalizeCart,
  useHook({ input, useData }) {
    const response = useData({
      swrOptions: { revalidateOnFocus: false, ...input.swrOptions },
    })

    return useMemo(
      () =>
        Object.create(response, {
          isEmpty: {
            get() {
              return (response.data?.lineItems.length ?? 0) <= 0
            },
            enumerable: true,
          },
        }),
      [response]
    )
  },
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
