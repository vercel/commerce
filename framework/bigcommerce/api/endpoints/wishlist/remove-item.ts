import type { Wishlist } from '../../../types/wishlist'
import getCustomerWishlist from '../../operations/get-customer-wishlist'
import getCustomerId from './utils/get-customer-id'
import type { WishlistEndpoint } from '.'

// Return wishlist info
const removeItem: WishlistEndpoint['handlers']['removeItem'] = async ({
  res,
  body: { customerToken, itemId },
  config,
  commerce,
}) => {
  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))
  const { wishlist } =
    (customerId &&
      (await commerce.getCustomerWishlist({
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
