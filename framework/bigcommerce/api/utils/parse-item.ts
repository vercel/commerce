import type { WishlistItemBody } from '../../types/wishlist'
import type { CartItemBody, OptionSelections } from '../../types/cart'

type BCWishlistItemBody = {
  product_id: number
  variant_id: number
}

type BCCartItemBody = {
  product_id: number
  variant_id: number
  quantity?: number
  option_selections?: OptionSelections[]
}

export const parseWishlistItem = (
  item: WishlistItemBody
): BCWishlistItemBody => ({
  product_id: Number(item.productId),
  variant_id: Number(item.variantId),
})

export const parseCartItem = (item: CartItemBody): BCCartItemBody => ({
  quantity: item.quantity,
  product_id: Number(item.productId),
  variant_id: Number(item.variantId),
  option_selections: item.optionSelections,
})
