import cartApi from '@framework/api/cart'
import cart from '@commerce/api/endpoints/cart'
import commerce from '@lib/api/commerce'

const x = commerce.endpoint({ handler: cart, operations: {} as any })

export default cartApi()
