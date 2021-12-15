import type { WishlistEndpoint } from '.'
import getCustomerId from '../../utils/get-customer-id'
import { normalizeWishlistItem } from '../../../lib/normalize'

// Return wishlist info
const getWishlist: WishlistEndpoint['handlers']['getWishlist'] = async ({
  res,
  body: { customerToken, includeProducts },
  config,
  commerce,
}) => {
  let result: { data?: any } = {}
  if (customerToken) {
    const customerId = customerToken && (await getCustomerId({ customerToken, config }))
    const wishlistName= config.defaultWishlistName
    if (!customerId) {
      // If the customerToken is invalid, then this request is too
      return res.status(404).json({
        data: null,
        errors: [{ message: 'Wishlist not found' }],
      })
    }
    const { wishlist } = await commerce.getCustomerWishlist({
      variables: { customerId, wishlistName },
      includeProducts,
      config,
    })

    result = { data: {...wishlist, items: wishlist?.items?.map((item:any) => normalizeWishlistItem(item, config, includeProducts))} }
  }

  res.status(200).json({ data: result?.data ?? null })
}

export default getWishlist
