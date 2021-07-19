import type { RequestInit } from '@vercel/fetch'
import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@commerce/api'
import createFetcher from './utils/fetch-local'

import type { LoginAPI } from './endpoints/login'
import login from './operations/login'

const API_URL = process.env.NEXT_PUBLIC_ELASTICPATH_BASE
const STOREID = process.env.NEXT_PUBLIC_ELASTICPATH_STOREID
const SECRET = process.env.NEXT_PUBLIC_ELASTICPATH_SECRET
const CLIENTID = process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID

if (!API_URL) {
  throw new Error(
    `The environment variable BIGCOMMERCE_STOREFRONT_API_URL is missing and it's required to access your store`
  )
}


const ONE_DAY = 60 * 60 * 24

const config: any = {
  commerceUrl: API_URL,
  customerCookie: 'SHOP_TOKEN',
  cartCookie: process.env.BIGCOMMERCE_CART_COOKIE ?? 'bc_cartId',
  cartCookieMaxAge: ONE_DAY * 30,
  applyLocale: true,

  // REST API only
  storeApiUrl: API_URL,
  fetch: createFetcher(() => getCommerceApi().getConfig()),
}

const operations = {
  login
}

export interface ElasticpathConfig extends CommerceAPIConfig {
  fetch: any
}

export const provider = { config, operations }

export type Provider = typeof provider

export type APIs =
  | LoginAPI

export type ElasticpathAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): ElasticpathAPI<P> {
  return commerceApi(customProvider)
}
