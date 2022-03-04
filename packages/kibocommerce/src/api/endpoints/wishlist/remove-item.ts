import getCustomerId from '../../utils/get-customer-id'
import type { WishlistEndpoint } from '.'
import { normalizeWishlistItem } from '../../../lib/normalize'
import removeItemFromWishlistMutation from '../../mutations/removeItemFromWishlist-mutation'

// Return wishlist info
const removeItem: WishlistEndpoint['handlers']['removeItem'] = async ({
  res,
  body: { customerToken, itemId },
  config,
  commerce,
}) => {
  const token = customerToken ? Buffer.from(customerToken, 'base64').toString('ascii'): null;
  const accessToken = token ? JSON.parse(token).accessToken : null;
  let result: { data?: any } = {}
  let wishlist: any

  const customerId = customerToken && (await getCustomerId({ customerToken, config }))
  const wishlistName= config.defaultWishlistName
  const wishlistResponse = await commerce.getCustomerWishlist({
    variables: { customerId, wishlistName },
    config,
  })
  wishlist= wishlistResponse?.wishlist 
  
  if (!wishlist || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  const removedItem = wishlist?.items?.find(
    (item:any) => {
      return item.product.productCode === itemId;
    }
  );

  const removeItemFromWishlistResponse = await config.fetch(
    removeItemFromWishlistMutation,
    {
      variables: {
        wishlistId: wishlist?.id,
        wishlistItemId: removedItem?.id
      },
    },
    { headers: { 'x-vol-user-claims': accessToken } }
  )

  if(removeItemFromWishlistResponse?.data?.deleteWishlistItem){
    const wishlistResponse= await commerce.getCustomerWishlist({
      variables: { customerId, wishlistName },
      config,
    })
    wishlist= wishlistResponse?.wishlist
  }
  result = { data: {...wishlist, items: wishlist?.items?.map((item:any) => normalizeWishlistItem(item, config))} }
  res.status(200).json({ data: result?.data })
}

export default removeItem
