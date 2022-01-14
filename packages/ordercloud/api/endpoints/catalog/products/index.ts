import type { OrdercloudAPI } from '../../../../api'

import { createEndpoint, GetAPISchema } from '@commerce/api'
import { ProductsSchema } from '@commerce/types/product'
import getProducts from './get-products'
import productsEndpoint from '@commerce/api/endpoints/catalog/products'

export type ProductsAPI = GetAPISchema<OrdercloudAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = { getProducts }

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
