import { HookFetcher } from '@commerce/utils/types'
import { SwrOptions } from '@commerce/utils/use-data'
import useResponse from '@commerce/utils/use-response'
import useCommerceWishlist from '@commerce/wishlist/use-wishlist'
import type { Wishlist } from '../api/wishlist'
import useCustomer from '../customer/use-customer'

const defaultOpts = {
  url: '/api/bigcommerce/wishlist',
  method: 'GET',
}

export type { Wishlist }

export interface UseWishlistOptions {
  includeProducts?: boolean
}

export interface UseWishlistInput extends UseWishlistOptions {
  customerId?: number
}

export const fetcher: HookFetcher<Wishlist | null, UseWishlistInput> = (
  options,
  { customerId, includeProducts },
  fetch
) => {
  if (!customerId) return null

  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')

  if (includeProducts) url.searchParams.set('products', '1')

  return fetch({
    url: url.pathname + url.search,
    method: options?.method ?? defaultOpts.method,
  })
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<Wishlist | null, UseWishlistInput>
) {
  const useWishlist = ({ includeProducts }: UseWishlistOptions = {}) => {
    const { data: customer } = useCustomer()
    const response = useCommerceWishlist(
      defaultOpts,
      [
        ['customerId', customer?.id],
        ['includeProducts', includeProducts],
      ],
      customFetcher,
      {
        revalidateOnFocus: false,
        ...swrOptions,
      }
    )
    const res = useResponse(response, {
      descriptors: {
        isEmpty: {
          get() {
            return (response.data?.items?.length || 0) <= 0
          },
          set: (x) => x,
        },
      },
    })

    return res
  }

  useWishlist.extend = extendHook

  return useWishlist
}

export default extendHook(fetcher)
