import type { CommerceAPI, CommerceAPIConfig } from '@vercel/commerce/api'
import { getCommerceApi as commerceApi } from '@vercel/commerce/api'
import { createBuyerFetcher, createMiddlewareFetcher } from './utils/fetch-rest'
import createGraphqlFetcher from './utils/fetch-graphql'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

import {
  API_URL,
  API_VERSION,
  CART_COOKIE,
  CUSTOMER_COOKIE,
  TOKEN_COOKIE,
} from '../constants'

export interface OrdercloudConfig extends CommerceAPIConfig {
  restBuyerFetch: <T>(
    method: string,
    resource: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => Promise<T>
  restMiddlewareFetch: <T>(
    method: string,
    resource: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => Promise<T>
  apiVersion: string
  tokenCookie: string
}

const config: OrdercloudConfig = {
  commerceUrl: API_URL,
  apiToken: '',
  apiVersion: API_VERSION,
  cartCookie: CART_COOKIE,
  customerCookie: CUSTOMER_COOKIE,
  tokenCookie: TOKEN_COOKIE,
  cartCookieMaxAge: 2592000,
  restBuyerFetch: createBuyerFetcher(() => getCommerceApi().getConfig()),
  restMiddlewareFetch: createMiddlewareFetcher(() =>
    getCommerceApi().getConfig()
  ),
  fetch: createGraphqlFetcher(() => getCommerceApi().getConfig()),
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
export type OrdercloudAPI<P extends Provider = Provider> = CommerceAPI<P | any>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): OrdercloudAPI<P> {
  return commerceApi(customProvider as any)
}
