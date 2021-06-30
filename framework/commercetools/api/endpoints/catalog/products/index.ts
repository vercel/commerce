import { GetAPISchema, createEndpoint } from '@commerce/api'
import productsEndpoint from '@commerce/api/endpoints/catalog/products'
import type { ProductsSchema } from '@commerce/types/product'
import type { CommercetoolsAPI } from '@framework/api'
import getProducts from './get-products'

export type ProductsAPI = GetAPISchema<CommercetoolsAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = { getProducts }

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
