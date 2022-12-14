import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import type { WishlistEndpoint } from '.'
import getCustomerId from '../../utils/get-customer-id'

// Return wishlist info
const getWishlist: WishlistEndpoint['handlers']['getWishlist'] = async ({
  body: { customerToken, includeProducts },
  config,
  commerce,
}) => {
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

    return { data: wishlist }
  }

  return { data: null }
}

export default getWishlist
