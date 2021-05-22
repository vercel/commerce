import type { GetAPISchema } from '@commerce/api'
import type { ProductsSchema } from '../../../../types/product'
import type { BigcommerceAPI } from '../../..'
import getProducts from './get-products'

export type ProductsAPI = GetAPISchema<BigcommerceAPI, ProductsSchema>

export type ProductsEndpoint = ProductsAPI['endpoint']

export const handlers = { getProducts }
