import cart from '@commerce/api/endpoints/cart'
import { CartAPI, operations } from '@framework/api/endpoints/cart'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: cart as CartAPI['endpoint']['handler'],
  operations,
})
