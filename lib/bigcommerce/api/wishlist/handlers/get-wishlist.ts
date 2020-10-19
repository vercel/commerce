import { BigcommerceApiError } from '../../utils/errors'
import type { Wishlist, WishlistHandlers } from '..'

// Return wishlist info
const getWishlist: WishlistHandlers['getWishlist'] = async ({
  res,
  body: { wishlistId },
  config,
}) => {
  let result: { data?: Wishlist } = {}

  try {
    result = await config.storeApiFetch(`/v3/wishlists/${wishlistId}`)
  } catch (error) {
    throw error
  }

  res.status(200).json({ data: result.data ?? null })
}

export default getWishlist
