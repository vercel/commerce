import { HookFetcher } from '@commerce/utils/types'
import type { Product } from '@commerce/types/product'
import data from '../data.json'
import { useCustomer } from '@framework/customer'

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
    const { data: customer } = useCustomer()
    const getWishlist =
      typeof localStorage !== 'undefined' && localStorage.getItem('wishlist')
    if (getWishlist && customer?.email) {
      const wishlist = JSON.parse(getWishlist)
      const items = wishlist.map((wishlist: string) => {
        const [product] = data.products.filter((p) => p.id === wishlist) as any
        const [variant] = product.variants
        return {
          variant_id: variant.id,
          product_id: wishlist,
          id: wishlist,
          product,
        }
      })
      return { data: { items } }
    }
    return { data: null }
  }

  useWishlist.extend = extendHook

  return useWishlist
}

export default extendHook(fetcher)
