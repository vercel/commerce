import getCustomerId from '../../operations/get-customer-id'
import getCustomerWishlist from '../../operations/get-customer-wishlist'
import type { Wishlist, WishlistHandlers } from '..'

// Return wishlist info
const getWishlist: WishlistHandlers['getWishlist'] = async ({
  res,
  body: { customerToken, includeProducts },
  config,
}) => {
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

    const { wishlist } = await getCustomerWishlist({
      variables: { customerId },
      includeProducts,
      config,
    })

    result = { data: wishlist }
  }

  res.status(200).json({ data: result.data ?? null })
}

export default getWishlist
