import { HookFetcher } from '../../commerce/utils/types'
import { SwrOptions } from '../../commerce/utils/use-data'
import useCommerceWishlist from '../../commerce/wishlist/use-wishlist'
import type { Wishlist } from '../api/wishlist'
import useCustomer from '../use-customer'

const defaultOpts = {
  url: '/api/bigcommerce/wishlist',
  method: 'GET',
}

export type { Wishlist }

export const fetcher: HookFetcher<Wishlist | null, { customerId?: number }> = (
  options,
  { customerId },
  fetch
) => {
  return customerId ? fetch({ ...defaultOpts, ...options }) : null
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<Wishlist | null, { customerId?: number }>
) {
  const useWishlists = () => {
    const { data: customer } = useCustomer()
    const response = useCommerceWishlist(
      defaultOpts,
      [['customerId', customer?.entityId]],
      customFetcher,
      {
        revalidateOnFocus: false,
        ...swrOptions,
      }
    )

    // Uses a getter to only calculate the prop when required
    // response.data is also a getter and it's better to not trigger it early
    Object.defineProperty(response, 'isEmpty', {
      get() {
        return (response.data?.items?.length || 0) > 0
      },
      set: (x) => x,
    })

    return response
  }

  useWishlists.extend = extendHook

  return useWishlists
}

export default extendHook(fetcher)
