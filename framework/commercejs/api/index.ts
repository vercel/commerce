import type { CommerceAPI, CommerceAPIConfig } from '@commerce/api'
import { getCommerceApi as commerceApi } from '@commerce/api'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'
import { fetchApi, FetchApi } from './utils/fetch-commercejs-api'
import { API_URL, CART_COOKIE } from '../constants'

export interface CommercejsConfig extends CommerceAPIConfig {
  fetch: any
}

const config: CommercejsConfig = {
  commerceUrl: API_URL,
  cartCookie: CART_COOKIE,
  cartCookieMaxAge: 2592000,
  customerCookie: '',
  apiToken: '',
  fetch: fetchApi,
}

const operations = {
  getAllPages,
  getPage,
  getSiteInfo,
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type Provider = typeof provider
export type CommercejsAPI<P extends Provider = Provider> = CommerceAPI<P | any>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): CommercejsAPI<P> {
  return commerceApi(customProvider as any)
}
