import type { WishlistHandlers } from '..'

// Return current wishlist info
const removeItem: WishlistHandlers['removeItem'] = async ({
  res,
  body: { wishlistId, itemId },
  config,
}) => {
  if (!wishlistId || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const result = await config.storeApiFetch<{ data: any } | null>(
    `/v3/wishlists/${wishlistId}/items/${itemId}`,
    { method: 'DELETE' }
  )
  const data = result?.data ?? null

  res.status(200).json({ data })
}

export default removeItem
