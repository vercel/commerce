import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@commerce/api'

import {
  API_URL,
  WOOCOMMERCE_CUSTOMER_TOKEN_COOKIE,
  WOOCOMMERCE_CHECKOUT_ID_COOKIE,
} from '../const'

import fetchGraphqlApi from './utils/fetch-graphql-api'

import * as operations from './operations'

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_WOOCOMMERCE_STORE_DOMAIN is missing and it's required to access your store`
  )
}

export interface WooCommerceConfig extends CommerceAPIConfig {}

const ONE_DAY = 60 * 60 * 24

//TODO we don't have a apiToken here
const config: WooCommerceConfig = {
  commerceUrl: API_URL,
  apiToken: '',
  customerCookie: WOOCOMMERCE_CUSTOMER_TOKEN_COOKIE,
  cartCookie: WOOCOMMERCE_CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
}

export const provider = {
  config,
  operations,
}

export type Provider = typeof provider

export type WOOCOMMERCEAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): WOOCOMMERCEAPI<P> {
  return commerceApi(customProvider)
}
