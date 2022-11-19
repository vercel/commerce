import { type GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import type { ProductsSchema } from '@vercel/commerce/types/product'
import type { ShopifyAPI } from '../../..'

import productsEndpoint from '@vercel/commerce/api/endpoints/catalog/products'

import getProducts from './get-products'

export type ProductsAPI = GetAPISchema<ShopifyAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = { getProducts }

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
