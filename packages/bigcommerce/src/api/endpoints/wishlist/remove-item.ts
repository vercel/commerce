import type { WishlistEndpoint } from '.'
import type { BCWishlist } from '../../utils/types'

import getCustomerId from '../../utils/get-customer-id'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import { normalizeWishlist } from '../../../lib/normalize'

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

  const result = await config.storeApiFetch<{ data: BCWishlist } | null>(
    `/v3/wishlists/${wishlist.id}/items/${itemId}`,
    { method: 'DELETE' }
  )

  return { data: result?.data ? normalizeWishlist(result.data) : null }
}

export default removeItem
