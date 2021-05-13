import type { CommerceAPIConfig } from '@commerce/api'

import {
  SWELL_CHECKOUT_ID_COOKIE,
  SWELL_CUSTOMER_TOKEN_COOKIE,
  SWELL_COOKIE_EXPIRE,
} from '../const'

import fetchApi from './utils/fetch-swell-api'

export interface SwellConfig extends CommerceAPIConfig {
  fetch: any
}

export class Config {
  private config: SwellConfig

  constructor(config: SwellConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<SwellConfig> = {}) {
    return Object.entries(userConfig).reduce<SwellConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<SwellConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  locale: 'en-US',
  commerceUrl: '',
  apiToken: ''!,
  cartCookie: SWELL_CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: SWELL_COOKIE_EXPIRE,
  fetch: fetchApi,
  customerCookie: SWELL_CUSTOMER_TOKEN_COOKIE,
})

export function getConfig(userConfig?: Partial<SwellConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<SwellConfig>) {
  return config.setConfig(newConfig)
}
