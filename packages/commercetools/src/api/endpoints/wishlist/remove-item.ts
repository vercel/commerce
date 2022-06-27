import type { WishlistEndpoint } from '.'
import { getActiveWishlist, normalizeWishlist } from '../../../utils'
import {
  ShoppingList,
  ShoppingListUpdate,
  ClientResponse,
} from '@commercetools/platform-sdk'

// Return wishlist info
const removeItem: WishlistEndpoint['handlers']['removeItem'] = async ({
  req,
  res,
  body: { itemId },
  config,
}) => {
  const activeWishlist = await getActiveWishlist(req, res, config.sdkFetch)
  if (!activeWishlist || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const lineItem: ShoppingListUpdate = {
    version: activeWishlist.version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: itemId,
      },
    ],
  }
  const updatedWishlist = await config.sdkFetch<
    ClientResponse<ShoppingList>,
    ShoppingListUpdate
  >({
    query: 'shoppingLists',
    method: 'post',
    variables: {
      id: activeWishlist.id,
    },
    body: lineItem,
  })

  const data = updatedWishlist.body
    ? normalizeWishlist(updatedWishlist.body)
    : null
  res.status(200).json({ data })
}

export default removeItem
