import { CommerceAPI, createEndpoint, GetAPISchema } from '@commerce/api'
import productsEndpoint from '@commerce/api/endpoints/catalog/products'
import type { ProductsSchema } from '@commerce/types/product'
import getProducts from './get-products'

export type ProductsAPI = GetAPISchema<CommerceAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = {
  getProducts,
}

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
