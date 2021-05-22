import products from '@commerce/api/endpoints/catalog/products'
import {
  ProductsAPI,
  handlers,
} from '@framework/api/endpoints/catalog/products'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: products as ProductsAPI['endpoint']['handler'],
  handlers,
})
