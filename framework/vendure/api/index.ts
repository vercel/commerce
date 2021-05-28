import type { CommerceAPIConfig } from '@commerce/api'
import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface VendureConfig extends CommerceAPIConfig {}

const API_URL = process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_VENDURE_SHOP_API_URL is missing and it's required to access your store`
  )
}

export class Config {
  private config: VendureConfig

  constructor(config: VendureConfig) {
    this.config = {
      ...config,
    }
  }

  getConfig(userConfig: Partial<VendureConfig> = {}) {
    return Object.entries(userConfig).reduce<VendureConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<VendureConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const ONE_DAY = 60 * 60 * 24
const config = new Config({
  commerceUrl: API_URL,
  apiToken: '',
  cartCookie: '',
  customerCookie: '',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
})

export function getConfig(userConfig?: Partial<VendureConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<VendureConfig>) {
  return config.setConfig(newConfig)
}
