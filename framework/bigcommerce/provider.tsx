import { useMemo } from 'react'
import { FetcherError } from '@commerce/utils/errors'
import type { Fetcher, HookHandler } from '@commerce/utils/types'
import type { FetchCartInput } from '@commerce/cart/use-cart'
import { normalizeCart } from './lib/normalize'
import type { Wishlist } from './api/wishlist'
import type { Customer, CustomerData } from './api/customers'
import type { SearchProductsData } from './api/catalog/products'
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
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    url: '/api/bigcommerce/cart',
    method: 'GET',
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    const data = cartId ? await fetch(options) : null
    return data && normalizeCart(data)
  },
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

const useCustomerHandler: HookHandler<Customer | null> = {
  fetchOptions: {
    url: '/api/bigcommerce/customers',
    method: 'GET',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<CustomerData | null>(options)
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

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
  sort?: string
}

const useSearch: HookHandler<
  SearchProductsData,
  SearchProductsInput,
  SearchProductsInput
> = {
  fetchOptions: {
    url: '/api/bigcommerce/catalog/products',
    method: 'GET',
  },
  fetcher({ input: { search, categoryId, brandId, sort }, options, fetch }) {
    // Use a dummy base as we only care about the relative path
    const url = new URL(options.url!, 'http://a')

    if (search) url.searchParams.set('search', search)
    if (Number.isInteger(categoryId))
      url.searchParams.set('category', String(categoryId))
    if (Number.isInteger(brandId))
      url.searchParams.set('brand', String(brandId))
    if (sort) url.searchParams.set('sort', sort)

    return fetch({
      url: url.pathname + url.search,
      method: options.method,
    })
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

export const bigcommerceProvider = {
  locale: 'en-us',
  cartCookie: 'bc_cartId',
  fetcher,
  cartNormalizer: normalizeCart,
  cart: { useCart },
  wishlist: { useWishlist },
  customer: { useCustomer: useCustomerHandler },
  products: { useSearch },
}

export type BigcommerceProvider = typeof bigcommerceProvider
