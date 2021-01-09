import type { RequestInit } from '@vercel/fetch'
import type { CommerceAPIConfig } from '@commerce/api'
import fetchGraphqlApi from './utils/fetch-graphql-api'
import fetchStoreApi from './utils/fetch-store-api'

export interface BigcommerceConfig extends CommerceAPIConfig {
  // Indicates if the returned metadata with translations should be applied to the
  // data or returned as it is
  applyLocale?: boolean
  storeApiUrl: string
  storeApiToken: string
  storeApiClientId: string
  storeChannelId?: string
  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

const API_URL = process.env.BIGCOMMERCE_STOREFRONT_API_URL
const API_TOKEN = process.env.BIGCOMMERCE_STOREFRONT_API_TOKEN
const STORE_API_URL = process.env.BIGCOMMERCE_STORE_API_URL
const STORE_API_TOKEN = process.env.BIGCOMMERCE_STORE_API_TOKEN
const STORE_API_CLIENT_ID = process.env.BIGCOMMERCE_STORE_API_CLIENT_ID
const STORE_CHANNEL_ID = process.env.BIGCOMMERCE_CHANNEL_ID

if (!API_URL) {
  throw new Error(
    `The environment variable BIGCOMMERCE_STOREFRONT_API_URL is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable BIGCOMMERCE_STOREFRONT_API_TOKEN is missing and it's required to access your store`
  )
}

if (!(STORE_API_URL && STORE_API_TOKEN && STORE_API_CLIENT_ID)) {
  throw new Error(
    `The environment variables BIGCOMMERCE_STORE_API_URL, BIGCOMMERCE_STORE_API_TOKEN, BIGCOMMERCE_STORE_API_CLIENT_ID have to be set in order to access the REST API of your store`
  )
}

export class Config {
  private config: BigcommerceConfig

  constructor(config: Omit<BigcommerceConfig, 'customerCookie'>) {
    this.config = {
      ...config,
      // The customerCookie is not customizable for now, BC sets the cookie and it's
      // not important to rename it
      customerCookie: 'SHOP_TOKEN',
    }
  }

  getConfig(userConfig: Partial<BigcommerceConfig> = {}) {
    return Object.entries(userConfig).reduce<BigcommerceConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<BigcommerceConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const ONE_DAY = 60 * 60 * 24
const config = new Config({
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  cartCookie: process.env.BIGCOMMERCE_CART_COOKIE ?? 'bc_cartId',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
  applyLocale: true,
  // REST API only
  storeApiUrl: STORE_API_URL,
  storeApiToken: STORE_API_TOKEN,
  storeApiClientId: STORE_API_CLIENT_ID,
  storeChannelId: STORE_CHANNEL_ID,
  storeApiFetch: fetchStoreApi,
})

export function getConfig(userConfig?: Partial<BigcommerceConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<BigcommerceConfig>) {
  return config.setConfig(newConfig)
}
