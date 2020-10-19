import type { WishlistHandlers } from '..'

// Return current wishlist info
const addItem: WishlistHandlers['addItem'] = async ({
  res,
  body: { wishlistId, item },
  config,
}) => {
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  const options = {
    method: 'POST',
    body: JSON.stringify({
      items: [item],
    }),
  }
  const { data } = await config.storeApiFetch(
    `/v3/wishlists/${wishlistId}/items`,
    options
  )

  res.status(200).json({ data })
}

export default addItem
