import { createEndpoint } from '@vercel/commerce/api'
import productsEndpoint from '@vercel/commerce/api/endpoints/catalog/products'

import type { GetAPISchema } from '@vercel/commerce/api'
import type {
  ProductsSchema,
  SearchProductsBody,
} from '@vercel/commerce/types/product'

import getProducts from './get-products'

import type { OlistAPI } from '../../../../api'
import type { Handler as HandlerAPI } from '../../../../types/api'

export type ProductsAPI = GetAPISchema<OlistAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers: ProductsEndpoint['handlers'] = { getProducts }

export type Handler = {
  body: SearchProductsBody
} & HandlerAPI

const productsApi = createEndpoint<ProductsAPI>({
  handler: productsEndpoint,
  handlers,
})

export default productsApi
