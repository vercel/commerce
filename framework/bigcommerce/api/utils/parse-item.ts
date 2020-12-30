import type { ItemBody as WishlistItemBody } from '../wishlist'
import type { ItemBody } from '../cart'

export const parseWishlistItem = (item: WishlistItemBody) => ({
  product_id: item.productId,
  variant_id: item.variantId,
})

export const parseCartItem = (item: ItemBody) => ({
  quantity: item.quantity,
  product_id: item.productId,
  variant_id: item.variantId,
  option_selections: item.optionSelections
})
