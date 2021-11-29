import type { MedusaAPI } from '../../../'
import { createEndpoint, GetAPISchema } from '@commerce/api'
import { ProductsSchema } from '@commerce/types/product'
import productsEndpoint from '@commerce/api/endpoints/catalog/products'
import getProducts from './get-products'

export type ProductsAPI = GetAPISchema<MedusaAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']
export const handlers: ProductsEndpoint['handlers'] = { getProducts }

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
