import getCustomerId from '../../../customer/get-customer-id'
import getCustomerWishlist, {
  Wishlist,
} from '../../../customer/get-customer-wishlist'
import type { WishlistHandlers } from '..'

// Return current wishlist info
const removeItem: WishlistHandlers['removeItem'] = async ({
  res,
  body: { customerToken, itemId },
  config,
}) => {
  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))
  const { wishlist } =
    (customerId &&
      (await getCustomerWishlist({
        variables: { customerId },
        config,
      }))) ||
    {}

  if (!wishlist || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const result = await config.storeApiFetch<{ data: Wishlist } | null>(
    `/v3/wishlists/${wishlist.id}/items/${itemId}`,
    { method: 'DELETE' }
  )
  const data = result?.data ?? null

  res.status(200).json({ data })
}

export default removeItem
