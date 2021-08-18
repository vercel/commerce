import type { APIProvider, CommerceAPIConfig } from '@commerce/api'
import { getCommerceApi as commerceApi } from '@commerce/api'
import createApiFetch from './utils/create-api-fetch'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface SpreeApiConfig extends CommerceAPIConfig {
  fetch: any // Using any type, because CommerceAPIConfig['fetch'] cannot be extended from Variables = any to SpreeSdkVariables
}

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

export const provider: APIProvider = { config, operations }

export type SpreeApiProvider = APIProvider

export const getCommerceApi = (customProvider: APIProvider = provider) =>
  commerceApi(customProvider)
