import { useMemo } from 'react'
import { FetcherError } from '@commerce/utils/errors'
import type { Fetcher, HookHandler } from '@commerce/utils/types'
import type { FetchCartInput } from '@commerce/cart/use-cart'
import { normalizeCart } from './lib/normalize'
import type { Wishlist } from './api/wishlist'
import type { Customer, CustomerData } from './api/customers'
import useCustomer from './customer/use-customer'
import type { Cart } from './types'

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText
  } catch (error) {
    return res.statusText
  }
}

async function getError(res: Response) {
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const data = await res.json()
    return new FetcherError({ errors: data.errors, status: res.status })
  }
  return new FetcherError({ message: await getText(res), status: res.status })
}

const fetcher: Fetcher = async ({
  url,
  method = 'GET',
  variables,
  body: bodyObj,
}) => {
  const hasBody = Boolean(variables || bodyObj)
  const body = hasBody
    ? JSON.stringify(variables ? { variables } : bodyObj)
    : undefined
  const headers = hasBody ? { 'Content-Type': 'application/json' } : undefined
  const res = await fetch(url!, { method, body, headers })

  if (res.ok) {
    const { data } = await res.json()
    return data
  }

  throw await getError(res)
}

const useCart: HookHandler<
  Cart | null,
  {},
  FetchCartInput,
  any,
  any,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    url: '/api/bigcommerce/cart',
    method: 'GET',
  },
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

const useWishlist: HookHandler<
  Wishlist | null,
  { includeProducts?: boolean },
  { customerId?: number; includeProducts: boolean },
  any,
  any,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    url: '/api/bigcommerce/wishlist',
    method: 'GET',
  },
  fetcher({ input: { customerId, includeProducts }, options, fetch }) {
    if (!customerId) return null

    // Use a dummy base as we only care about the relative path
    const url = new URL(options.url!, 'http://a')

    if (includeProducts) url.searchParams.set('products', '1')

    return fetch({
      url: url.pathname + url.search,
      method: options.method,
    })
  },
  useHook({ input, useData }) {
    const { data: customer } = useCustomer()
    const response = useData({
      input: [
        ['customerId', customer?.id],
        ['includeProducts', input.includeProducts],
      ],
      swrOptions: {
        revalidateOnFocus: false,
        ...input.swrOptions,
      },
    })

    return useMemo(
      () =>
        Object.create(response, {
          isEmpty: {
            get() {
              return (response.data?.items?.length || 0) <= 0
            },
            enumerable: true,
          },
        }),
      [response]
    )
  },
}

const useCustomerHandler: HookHandler<
  Customer | null,
  {},
  {},
  CustomerData | null,
  any
> = {
  fetchOptions: {
    url: '/api/bigcommerce/customers',
    method: 'GET',
  },
  normalizer: (data) => data.customer,
  useHook({ input, useData }) {
    return useData({
      swrOptions: {
        revalidateOnFocus: false,
        ...input.swrOptions,
      },
    })
  },
}

export const bigcommerceProvider = {
  locale: 'en-us',
  cartCookie: 'bc_cartId',
  fetcher,
  cartNormalizer: normalizeCart,
  cart: { useCart },
  wishlist: { useWishlist },
  customer: { useCustomer: useCustomerHandler },
}

export type BigcommerceProvider = typeof bigcommerceProvider
