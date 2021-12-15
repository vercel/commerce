import type { CommerceAPI, CommerceAPIConfig } from '@commerce/api'
import { getCommerceApi as commerceApi } from '@commerce/api'
import createApiFetch from './utils/create-api-fetch'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface SpreeApiConfig extends CommerceAPIConfig {}

const config: SpreeApiConfig = {
  commerceUrl: '',
  apiToken: '',
  cartCookie: '',
  customerCookie: '',
  cartCookieMaxAge: 2592000,
  fetch: createApiFetch(() => getCommerceApi().getConfig()),
}

const operations = {
  getAllPages,
  getPage,
  getSiteInfo,
  getCustomerWishlist,
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type SpreeApiProvider = typeof provider

export type SpreeApi<P extends SpreeApiProvider = SpreeApiProvider> =
  CommerceAPI<P>

export function getCommerceApi<P extends SpreeApiProvider>(
  customProvider: P = provider as any
): SpreeApi<P> {
  return commerceApi(customProvider)
}
