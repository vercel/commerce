import { FetcherError } from '@commerce/utils/errors'
import type { Fetcher, HookHandler } from '@commerce/utils/types'
import type { FetchCartInput } from '@commerce/cart/use-cart'
import { normalizeCart } from './lib/normalize'
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

const useWishlist: HookHandler<
  Cart | null,
  {},
  FetchCartInput,
  any,
  any,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    url: '/api/bigcommerce/wishlist',
    method: 'GET',
  },
  swrOptions: {
    revalidateOnFocus: false,
  },
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

export const bigcommerceProvider = {
  locale: 'en-us',
  cartCookie: 'bc_cartId',
  fetcher,
  cartNormalizer: normalizeCart,
  cart: { useCart },
  wishlist: { useWishlist },
}

export type BigcommerceProvider = typeof bigcommerceProvider
