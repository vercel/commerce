import type { WishlistHandlers } from '..'
import getCustomerId from '../../operations/get-customer-id'
import getCustomerWishlist from '../../operations/get-customer-wishlist'
import { parseWishlistItem } from '../../utils/parse-item'

// Returns the wishlist of the signed customer
const addItem: WishlistHandlers['addItem'] = async ({
  res,
  body: { customerToken, item },
  config,
}) => {
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))

  if (!customerId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const { wishlist } = await getCustomerWishlist({
    variables: { customerId },
    config,
  })
  const options = {
    method: 'POST',
    body: JSON.stringify(
      wishlist
        ? {
            items: [parseWishlistItem(item)],
          }
        : {
            name: 'Wishlist',
            customer_id: customerId,
            items: [parseWishlistItem(item)],
            is_public: false,
          }
    ),
  }

  const { data } = wishlist
    ? await config.storeApiFetch(`/v3/wishlists/${wishlist.id}/items`, options)
    : await config.storeApiFetch('/v3/wishlists', options)

  res.status(200).json({ data })
}

export default addItem
