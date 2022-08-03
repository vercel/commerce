import { getCommerceApi as commerceApi } from '@vercel/commerce/api'

import type { CommerceAPI, CommerceAPIConfig } from '@vercel/commerce/api'
import type { VndaServiceSingleton } from '@vnda/headless-framework'

import createGraphqlFetcher from './utils/fetch-graphql'

import { client } from '../api/utils/fetch'

import getPage from '../api/operations/get-page'
import getProduct from '../api/operations/get-product'
import getSiteInfo from '../api/operations/get-site-info'
import getAllPages from '../api/operations/get-all-pages'
import getAllProducts from '../api/operations/get-all-products'
import getAllProductPaths from '../api/operations/get-all-product-paths'

import {
  API_URL,
  API_VERSION,
  CART_COOKIE,
  CUSTOMER_COOKIE,
  TOKEN_COOKIE,
  API_TOKEN,
  STORE_DOMAIN,
  CART_TOKEN_COOKIE,
  CUSTOMER_TOKEN_COOKIE,
} from '../constants'

if (!API_TOKEN) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_OLIST_STOREFRONT_ACCESS_TOKEN is missing and it's required to access your store`
  )
}

if (!STORE_DOMAIN) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_OLIST_STOREFRONT_DOMAIN is missing and it's required to access your store`
  )
}

export interface OlistConfig extends CommerceAPIConfig {
  commerceUrl: string
  service: VndaServiceSingleton
  apiVersion: string
  tokenCookie: string
  storeDomain: string
  cartTokenCookie: string
  customerTokenCookie: string
}

const ONE_DAY = 60 * 60 * 24

const config: OlistConfig = {
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  storeDomain: STORE_DOMAIN,
  apiVersion: API_VERSION,
  cartCookie: CART_COOKIE,
  customerCookie: CUSTOMER_COOKIE,
  tokenCookie: TOKEN_COOKIE,
  cartTokenCookie: CART_TOKEN_COOKIE,
  customerTokenCookie: CUSTOMER_TOKEN_COOKIE,
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: createGraphqlFetcher(() => getCommerceApi().getConfig()),
  service: client(API_TOKEN, STORE_DOMAIN),
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
export type OlistAPI<P extends Provider = Provider> = CommerceAPI<P | any>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): OlistAPI<P> {
  return commerceApi(customProvider as any)
}
