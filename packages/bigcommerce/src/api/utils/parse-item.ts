import type { WishlistItemBody } from '@vercel/commerce/types/wishlist'
import type { CartItemBody, SelectedOption } from '@vercel/commerce/types/cart'

type BCWishlistItemBody = {
  product_id: number
  variant_id: number
}

type BCCartItemBody = {
  product_id: number
  variant_id: number
  quantity?: number
  option_selections?: SelectedOption[]
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
  option_selections: item.optionsSelected,
})
