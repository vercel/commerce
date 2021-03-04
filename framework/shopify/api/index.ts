import type { CommerceAPIConfig } from '@commerce/api'

import {
  API_URL,
  API_TOKEN,
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
} from '../const'

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

import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface ShopifyConfig extends CommerceAPIConfig {}

export class Config {
  private config: ShopifyConfig

  constructor(config: ShopifyConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<ShopifyConfig> = {}) {
    return Object.entries(userConfig).reduce<ShopifyConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<ShopifyConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  locale: 'en-US',
  commerceUrl: API_URL,
  apiToken: API_TOKEN!,
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: SHOPIFY_COOKIE_EXPIRE,
  fetch: fetchGraphqlApi,
  customerCookie: SHOPIFY_CUSTOMER_TOKEN_COOKIE,
})

export function getConfig(userConfig?: Partial<ShopifyConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<ShopifyConfig>) {
  return config.setConfig(newConfig)
}
