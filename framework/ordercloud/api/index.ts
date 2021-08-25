import type { CommerceAPI, CommerceAPIConfig } from '@commerce/api'
import { getCommerceApi as commerceApi } from '@commerce/api'
import createFetcher from './utils/fetch'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'
import { API_URL, CART_COOKIE, CUSTOMER_COOKIE } from '../constants'

export interface OrdercloudConfig extends Omit<CommerceAPIConfig, 'fetch'> {
  fetch: <T>(
    method: string,
    resource: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => Promise<T>
}

const config: OrdercloudConfig = {
  commerceUrl: API_URL,
  apiToken: '',
  cartCookie: CART_COOKIE,
  customerCookie: CUSTOMER_COOKIE,
  cartCookieMaxAge: 2592000,
  fetch: createFetcher(() => getCommerceApi().getConfig()),
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

export type Provider = typeof provider
export type OrdercloudAPI<P extends Provider = Provider> = CommerceAPI<P | any>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): OrdercloudAPI<P> {
  return commerceApi(customProvider as any)
}
