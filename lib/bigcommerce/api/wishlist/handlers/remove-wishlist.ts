import type { WishlistHandlers } from '..'

// Return current wishlist info
const removeWishlist: WishlistHandlers['removeWishlist'] = async ({
  res,
  body: { wishlistId },
  config,
}) => {
  if (!wishlistId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const result = await config.storeApiFetch<{ data: any } | null>(
    `/v3/wishlists/${wishlistId}/`,
    { method: 'DELETE' }
  )
  const data = result?.data ?? null

  res.status(200).json({ data })
}

export default removeWishlist
