import { useMemo } from 'react'
import { Fetcher, HookFetcherFn, HookHandler } from '@commerce/utils/types'

import {
  API_TOKEN,
  API_URL,
  SHOPIFY_CHECKOUT_ID_COOKIE,
  STORE_DOMAIN,
} from './const'

import { Cart } from './types'
import { Customer } from '@commerce/types'
import { normalizeCart, normalizeProduct } from './lib/normalize'
import { FetchCartInput } from '@commerce/cart/use-cart'
import { checkoutCreate, checkoutToCart } from './cart/utils'

import {
  getAllProductsQuery,
  getCustomerQuery,
  getCheckoutQuery,
  handleFetchResponse,
  getSearchVariables,
} from './utils'

import { ProductEdge } from './schema'
import { SearchProductsInput } from 'framework/bigcommerce/provider'
import { SearchProductsData } from 'framework/bigcommerce/api/catalog/products'

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
  FetchCartInput,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  fetcher: cartFetcher,
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

const useSearch: HookHandler<
  SearchProductsData,
  SearchProductsInput,
  SearchProductsInput
> = {
  fetchOptions: {
    query: getAllProductsQuery,
  },
  async fetcher({ input, options, fetch }) {
    const resp = await fetch({
      query: options?.query,
      method: options?.method,
      variables: getSearchVariables(input),
    })
    const edges = resp.products?.edges
    return {
      products: edges?.map(({ node: p }: ProductEdge) => normalizeProduct(p)),
      found: !!edges?.length,
    }
  },
  useHook({ input, useData }) {
    return useData({
      input: [
        ['search', input.search],
        ['categoryId', input.categoryId],
        ['brandId', input.brandId],
        ['sort', input.sort],
      ],
      swrOptions: {
        revalidateOnFocus: false,
        ...input.swrOptions,
      },
    })
  },
}

const useCustomerHandler: HookHandler<Customer | null> = {
  fetchOptions: {
    query: getCustomerQuery,
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<any | null>(options)
    return data?.customer ?? null
  },
  useHook({ input, useData }) {
    return useData({
      swrOptions: {
        revalidateOnFocus: false,
        ...input.swrOptions,
      },
    })
  },
}

export const shopifyProvider = {
  locale: 'en-us',
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  storeDomain: STORE_DOMAIN,
  fetcher,
  cartNormalizer: normalizeCart,
  cart: { useCart },
  customer: { useCustomer: useCustomerHandler },
  products: { useSearch },
}

export type ShopifyProvider = typeof shopifyProvider
