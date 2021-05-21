import cart from '@commerce/api/endpoints/cart'
import { CartAPI, handlers } from '@framework/api/endpoints/cart'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: cart as CartAPI['endpoint']['handler'],
  handlers,
})
