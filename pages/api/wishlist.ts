import wishlist from '@commerce/api/endpoints/wishlist'
import { WishlistAPI, handlers } from '@framework/api/endpoints/wishlist'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: wishlist as WishlistAPI['endpoint']['handler'],
  handlers,
})
