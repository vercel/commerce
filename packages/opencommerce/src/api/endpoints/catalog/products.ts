import { CommerceAPI, createEndpoint, GetAPISchema } from '@vercel/commerce/api'
import productsEndpoint from '@vercel/commerce/api/endpoints/catalog/products'
import type { ProductsSchema } from '../../../types/product'
import type { OpenCommerceAPI } from '../../index'
import getProducts from './get-products'

export type ProductsAPI = GetAPISchema<OpenCommerceAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = {
  getProducts,
}

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
