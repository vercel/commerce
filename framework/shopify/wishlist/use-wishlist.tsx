import { HookFetcher } from '@commerce/utils/types'
import { SwrOptions } from '@commerce/utils/use-data'
import useCommerceWishlist from '@commerce/wishlist/use-wishlist'
import { Product } from '../schema'
import useCustomer from '../customer/use-customer'

const defaultOpts = {}

export type Wishlist = {
  items: [
    {
      product_id: number
      variant_id: number
      id: number
      product: Product
    }
  ]
}

export interface UseWishlistOptions {
  includeProducts?: boolean
}

export interface UseWishlistInput extends UseWishlistOptions {
  customerId?: number
}

export const fetcher: HookFetcher<Wishlist | null, UseWishlistInput> = () => {
  return null
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<Wishlist | null, UseWishlistInput>
) {
  const useWishlist = ({ includeProducts }: UseWishlistOptions = {}) => {
    return { data: null }
  }

  useWishlist.extend = extendHook

  return useWishlist
}

export default extendHook(fetcher)
