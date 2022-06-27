import type { WishlistEndpoint } from '.'
import { getActiveWishlist, normalizeWishlist } from '../../../utils'
import {
  ShoppingList,
  ShoppingListUpdate,
  ClientResponse,
} from '@commercetools/platform-sdk'

const addItem: WishlistEndpoint['handlers']['addItem'] = async ({
  req,
  res,
  body: { item },
  config,
}) => {
  const { productId, variantId } = item
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }
  try {
    const activeWishlist = await getActiveWishlist(req, res, config.sdkFetch)
    const lineItem: ShoppingListUpdate = {
      version: activeWishlist.version,
      actions: [
        {
          action: 'addLineItem',
          variantId: +variantId,
          productId: productId,
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

    return res
      .status(200)
      .json({
        data: updatedWishlist.body
          ? normalizeWishlist(updatedWishlist.body)
          : null,
      })
  } catch (err: any) {
    res.status(500).json({
      data: null,
      errors: [{ message: err.message }],
    })
  }
}

export default addItem
