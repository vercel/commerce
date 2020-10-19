import type { WishlistHandlers } from '..'

// Update wish info
const updateWishlist: WishlistHandlers['updateWishlist'] = async ({
  res,
  body: { wishlistId, wishlist },
  config,
}) => {
  if (!wishlistId || !wishlist) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const { data } = await config.storeApiFetch(
    `/v3/wishlists/${wishlistId}/`,
    {
      method: 'PUT',
      body: JSON.stringify(wishlist),
    }
  )

  res.status(200).json({ data })
}

export default updateWishlist
