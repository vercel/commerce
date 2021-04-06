import type { RequestInit } from '@vercel/fetch'
import type { CommerceAPIConfig } from '@commerce/api'
import fetchGraphqlApi from './utils/fetch-graphql-api'
import fetchStoreApi from './utils/fetch-store-api'

export interface AquilacmsConfig extends CommerceAPIConfig {
  // Indicates if the returned metadata with translations should be applied to the
  // data or returned as it is
  applyLocale?: boolean
  storeApiUrl: string
  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

const STORE_URL = process.env.AQUILACMS_URL
const STORE_API_URL = process.env.AQUILACMS_API_URL

if (!STORE_URL) {
  throw new Error(
    `The environment variable AQUILACMS_URL is missing and it's required to access your store`
  )
}

if (!STORE_API_URL) {
  throw new Error(
    `The environment variable AQUILACMS_API_URL is missing and it's required to access your store`
  )
}

export class Config {
  private config: AquilacmsConfig

  constructor(config: AquilacmsConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<AquilacmsConfig> = {}) {
    return Object.entries(userConfig).reduce<AquilacmsConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<AquilacmsConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const ONE_DAY = 60 * 60 * 24
const config = new Config({
  commerceUrl: STORE_URL,
  apiToken: '',
  cartCookie: process.env.AQUILACMS_CART_COOKIE ?? 'aquilacms_cartId',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
  applyLocale: true,
  storeApiUrl: STORE_API_URL,
  storeApiFetch: fetchStoreApi,
  customerCookie: 'jwt',
})

export function getConfig(userConfig?: Partial<AquilacmsConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<AquilacmsConfig>) {
  return config.setConfig(newConfig)
}
