import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
  getEndpoint,
} from '@commerce/api'

import {
  API_URL,
  API_TOKEN,
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from '../const'

import fetchGraphqlApi from './utils/fetch-graphql-api'

import getSiteInfo from './operations/get-site-info'
import { NextApiHandler } from 'next'

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing and it's required to access your store`
  )
}
export interface ShopifyConfig extends CommerceAPIConfig {
  applyLocale?: boolean
}

const ONE_DAY = 60 * 60 * 24
const config: ShopifyConfig = {
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  customerCookie: SHOPIFY_CUSTOMER_TOKEN_COOKIE,
  cartCookie: process.env.SHOPIFY_CART_COOKIE ?? 'shopify_checkoutId',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
  applyLocale: true,
}

export const provider = {
  config: config,
  operations: { getSiteInfo },
}

export type Provider = typeof provider

export default provider
