import type { WishlistEndpoint } from '.'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import { normalizeWishlistItem } from '../../../lib/normalize'
import getCustomerId from '../../utils/get-customer-id'
import removeItemFromWishlistMutation from '../../mutations/removeItemFromWishlist-mutation'

// Return wishlist info
const removeItem: WishlistEndpoint['handlers']['removeItem'] = async ({
  body: { customerToken, itemId },
  config,
  commerce,
}) => {
  const token = customerToken
    ? Buffer.from(customerToken, 'base64').toString('ascii')
    : null
  const accessToken = token ? JSON.parse(token).accessToken : null
  let result: { data?: any } = {}
  let wishlist: any

  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))
  const wishlistName = config.defaultWishlistName
  const wishlistResponse = await commerce.getCustomerWishlist({
    variables: { customerId, wishlistName },
    config,
  })
  wishlist = wishlistResponse?.wishlist

  if (!wishlist) {
    throw new CommerceAPIError('Wishlist not found', { status: 404 })
  }

  const removedItem = wishlist?.items?.find((item: any) => {
    return item.product.productCode === itemId
  })

  const removeItemFromWishlistResponse = await config.fetch(
    removeItemFromWishlistMutation,
    {
      variables: {
        wishlistId: wishlist?.id,
        wishlistItemId: removedItem?.id,
      },
    },
    { headers: { 'x-vol-user-claims': accessToken } }
  )

  if (removeItemFromWishlistResponse?.data?.deleteWishlistItem) {
    const wishlistResponse = await commerce.getCustomerWishlist({
      variables: { customerId, wishlistName },
      config,
    })
    wishlist = wishlistResponse?.wishlist
  }
  result = {
    data: {
      ...wishlist,
      items: wishlist?.items?.map((item: any) =>
        normalizeWishlistItem(item, config)
      ),
    },
  }

  return {
    data: result?.data,
  }
}

export default removeItem
