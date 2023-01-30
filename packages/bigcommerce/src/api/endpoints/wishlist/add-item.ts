import { parseWishlistItem } from '../../utils/parse-item'
import getCustomerId from '../../utils/get-customer-id'
import type { WishlistEndpoint } from '.'
import { normalizeWishlist } from '../../../lib/normalize'

const addItem: WishlistEndpoint['handlers']['addItem'] = async ({
  body: { customerToken, item },
  config,
  commerce,
}) => {
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
    const { data } = await config.storeApiFetch<any>('/v3/wishlists', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Next.js Commerce Wishlist',
        is_public: false,
        customer_id: Number(customerId),
        items: [parseWishlistItem(item)],
      }),
    })
    return {
      data: normalizeWishlist(data),
    }
  }

  // Existing Wishlist, let's add Item to Wishlist
  const { data } = await config.storeApiFetch<any>(
    `/v3/wishlists/${wishlist.id}/items`,
    {
      method: 'POST',
      body: JSON.stringify({
        items: [parseWishlistItem(item)],
      }),
    }
  )

  // Returns Wishlist
  return {
    data: normalizeWishlist(data),
  }
}

export default addItem
