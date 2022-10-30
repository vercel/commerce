import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import type { Wishlist } from '@vercel/commerce/types/wishlist'
import type { WishlistEndpoint } from '.'
import getCustomerId from '../../utils/get-customer-id'

// Return wishlist info
const getWishlist: WishlistEndpoint['handlers']['getWishlist'] = async ({
  body: { customerToken, includeProducts },
  config,
  commerce,
}) => {
  let result: { data?: Wishlist } = {}

  if (customerToken) {
    const customerId =
      customerToken && (await getCustomerId({ customerToken, config }))

    if (!customerId) {
      throw new CommerceAPIError('Wishlist not found', { status: 404 })
    }

    const { wishlist } = await commerce.getCustomerWishlist({
      variables: { customerId },
      includeProducts,
      config,
    })

    result = { data: wishlist }
  }

  return { data: result.data ?? null }
}

export default getWishlist
