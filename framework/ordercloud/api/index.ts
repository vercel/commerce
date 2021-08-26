import type { CommerceAPI, CommerceAPIConfig } from '@commerce/api'
import { getCommerceApi as commerceApi } from '@commerce/api'
import createRestFetcher from './utils/fetch-rest'
import createGraphqlFetcher from './utils/fetch-graphql'

import getSiteInfo from './operations/get-site-info'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'
import { API_URL, CART_COOKIE, CUSTOMER_COOKIE } from '../constants'

export interface OrdercloudConfig extends CommerceAPIConfig {
  restFetch: <T>(
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
  restFetch: createRestFetcher(() => getCommerceApi().getConfig()),
  fetch: createGraphqlFetcher(() => getCommerceApi().getConfig()),
}

const operations = {
  getSiteInfo,
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
