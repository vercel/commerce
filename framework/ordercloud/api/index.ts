import type { CommerceAPI, CommerceAPIConfig } from '@commerce/api'
import { getCommerceApi as commerceApi } from '@commerce/api'
import createFetcher from './utils/fetch-rest'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface OrdercloudConfig extends Omit<CommerceAPIConfig, 'fetch'> {
  fetch: <T>(
    method: string,
    resource: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => Promise<T>
}

const config: OrdercloudConfig = {
  commerceUrl: 'https://sandboxapi.ordercloud.io/v1',
  apiToken: '',
  cartCookie: '',
  customerCookie: '',
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
export type OrderCloudAPI<P extends Provider = Provider> = CommerceAPI<P | any>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): OrderCloudAPI<P> {
  return commerceApi(customProvider as any)
}
