import type { Wishlist } from '../../../types/wishlist'
import type { WishlistEndpoint } from '.'
import { getCustomerId } from '../../../utils'
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from '../../../const'

// Return wishlist info
const getWishlist: WishlistEndpoint['handlers']['getWishlist'] = async ({
  req,
  res,
  config,
  commerce,
}) => {
  const { cookies } = req
  const customerToken = cookies[SHOPIFY_CUSTOMER_TOKEN_COOKIE]
  let result: { data?: Wishlist } = {}

  if (customerToken) {
    const customerId =
      customerToken && (await getCustomerId({ customerToken, config }))

    if (!customerId) {
      // If the customerToken is invalid, then this request is too
      return res.status(404).json({
        data: null,
        errors: [{ message: 'Wishlist not found' }],
      })
    }

    const { wishlist } = await commerce.getCustomerWishlist({
      variables: { customerId },
      config,
    })

    result = { data: wishlist }
  }

  res.status(200).json({ data: result.data ?? null })
}

export default getWishlist
