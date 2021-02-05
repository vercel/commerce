import type { CommerceAPIConfig } from '@commerce/api'
import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from '@framework/const'
import fetchGraphqlApi from '../utils/fetch-graphql-api'

export interface ShopifyConfig extends CommerceAPIConfig {}

const API_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

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

const ONE_DAY = 60 * 60 * 24

const config = new Config({
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
  customerCookie: SHOPIFY_CUSTOMER_TOKEN_COOKIE,
})

export function getConfig(userConfig?: Partial<ShopifyConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<ShopifyConfig>) {
  return config.setConfig(newConfig)
}
