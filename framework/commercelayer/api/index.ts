import type { CommerceAPI, CommerceAPIConfig } from '@commerce/api'
import type { RequestInit, Response, Fetch } from '@vercel/fetch'
import { getCommerceApi as commerceApi } from '@commerce/api'
import createFetcher from './utils/fetch-api'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

import { getToken } from './utils/get-token'
import fetch from './utils/fetch'

export interface CommercelayerConfig extends Omit<CommerceAPIConfig, 'fetch'> {
  apiClientId: string
  apiToken: string
  apiFetch(
    query: string,
    endpoint: string,
    fetchOptions?: RequestInit,
    user?: UserCredentials
  ): Promise<{ data: any; res: Response }>
}

export type UserCredentials = {
  email: string
  password: string
}

const CLIENT_ID = process.env.COMMERCELAYER_CLIENT_ID
const ENDPOINT = process.env.COMMERCELAYER_ENDPOINT
const MARKET_SCOPE = process.env.COMMERCELAYER_MARKET_SCOPE

if (!CLIENT_ID) {
  throw new Error(
    `The environment variable COMMERCELAYER_CLIENT_ID is missing and it's required to access your store`
  )
}

if (!ENDPOINT) {
  throw new Error(
    `The environment variable COMMERCELAYER_ENDPOINT is missing and it's required to access your store`
  )
}

if (!MARKET_SCOPE) {
  throw new Error(
    `The environment variable COMMERCELAYER_MARKET_SCOPE is missing and it's required to access your store`
  )
}

export async function getAccessToken(user?: UserCredentials) {
  return await getToken({
    clientId: CLIENT_ID,
    endpoint: ENDPOINT,
    scope: MARKET_SCOPE,
    user,
  })
}

const config: CommercelayerConfig = {
  commerceUrl: ENDPOINT,
  apiClientId: CLIENT_ID,
  cartCookie: '',
  customerCookie: '',
  cartCookieMaxAge: 2592000,
  apiToken: '',
  apiFetch: createFetcher(() => getCommerceApi().getConfig()),
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
export type CommercelayerAPI<P extends Provider = Provider> = CommerceAPI<
  P | any
>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): CommercelayerAPI<P> {
  return commerceApi(customProvider as any)
}
