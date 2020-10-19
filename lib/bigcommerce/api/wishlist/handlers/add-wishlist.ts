import type { WishlistHandlers } from '..'

// Return current wishlist info
const addWishlist: WishlistHandlers['addWishlist'] = async ({
  res,
  body: { wishlist },
  config,
}) => {
  if (!wishlist) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing wishlist data' }],
    })
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(wishlist),
  }
  const { data } = await config.storeApiFetch(`/v3/wishlists/`, options)

  res.status(200).json({ data })
}

export default addWishlist
