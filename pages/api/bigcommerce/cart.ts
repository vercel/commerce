import cart from '@commerce/api/endpoints/cart'
import { operations } from '@framework/api/cart'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({ handler: cart, operations })
