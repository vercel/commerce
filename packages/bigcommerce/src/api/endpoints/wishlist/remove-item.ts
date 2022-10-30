import type { Wishlist } from '@vercel/commerce/types/wishlist'
import getCustomerId from '../../utils/get-customer-id'
import type { WishlistEndpoint } from '.'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'

// Return wishlist info
const removeItem: WishlistEndpoint['handlers']['removeItem'] = async ({
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
    throw new CommerceAPIError('Wishlist not found', { status: 400 })
  }

  const result = await config.storeApiFetch<{ data: Wishlist } | null>(
    `/v3/wishlists/${wishlist.id}/items/${itemId}`,
    { method: 'DELETE' }
  )
  const data = result?.data ?? null

  return { data }
}

export default removeItem
