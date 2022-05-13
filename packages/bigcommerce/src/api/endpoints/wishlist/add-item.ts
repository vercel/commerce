import getCustomerWishlist from '../../operations/get-customer-wishlist'
import { parseWishlistItem } from '../../utils/parse-item'
import getCustomerId from '../../utils/get-customer-id'
import type { WishlistEndpoint } from '.'

const addItem: WishlistEndpoint['handlers']['addItem'] = async ({
  res,
  body: { customerToken, item },
  config,
  commerce,
}) => {
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  try {
    const customerId =
      customerToken && (await getCustomerId({ customerToken, config }))

    if (!customerId) {
      throw new Error('Invalid request. No CustomerId')
    }

    let { wishlist } = await commerce.getCustomerWishlist({
      variables: { customerId },
      config,
    })

    if (!wishlist) {
      // If user has no wishlist, then let's create one with new item
      const { data } = await config.storeApiFetch('/v3/wishlists', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Next.js Commerce Wishlist',
          is_public: false,
          customer_id: Number(customerId),
          items: [parseWishlistItem(item)],
        }),
      })
      return res.status(200).json(data)
    }

    // Existing Wishlist, let's add Item to Wishlist
    const { data } = await config.storeApiFetch(
      `/v3/wishlists/${wishlist.id}/items`,
      {
        method: 'POST',
        body: JSON.stringify({
          items: [parseWishlistItem(item)],
        }),
      }
    )

    // Returns Wishlist
    return res.status(200).json(data)
  } catch (err: any) {
    res.status(500).json({
      data: null,
      errors: [{ message: err.message }],
    })
  }
}

export default addItem
