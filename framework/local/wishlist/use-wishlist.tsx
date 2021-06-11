import { HookFetcher } from '@commerce/utils/types'
import type { Product } from '@commerce/types/product'

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
  // swrOptions?: SwrOptions<Wishlist | null, UseWishlistInput>
  swrOptions?: any
) {
  const useWishlist = ({ includeProducts }: UseWishlistOptions = {}) => {
    return { data: null }
  }

  useWishlist.extend = extendHook

  return useWishlist
}

export default extendHook(fetcher)
