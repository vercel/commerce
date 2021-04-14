import type { CommerceAPIConfig } from '@commerce/api'

import {
  API_URL,
  API_CHANNEL,
} from '../const'

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_SALEOR_API_URL is missing and it's required to access your store`
  )
}

if (!API_CHANNEL) {
  throw new Error(
    `The environment variable NEXT_SALEOR_CHANNEL is missing and it's required to access your store`
  )
}

import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface SaleorConfig extends CommerceAPIConfig {
  storeChannel: string
}

export class Config {
  private config: SaleorConfig

  constructor(config: SaleorConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<SaleorConfig> = {}) {
    return Object.entries(userConfig).reduce<SaleorConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<SaleorConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  locale: 'en-US',
  commerceUrl: API_URL,
  apiToken: "",
  cartCookie: "saleorCheckoutID",
  cartCookieMaxAge: 60 * 60 * 24 * 30,
  fetch: fetchGraphqlApi,
  customerCookie: "",
  storeChannel: API_CHANNEL,
})

export function getConfig(userConfig?: Partial<SaleorConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<SaleorConfig>) {
  return config.setConfig(newConfig)
}
