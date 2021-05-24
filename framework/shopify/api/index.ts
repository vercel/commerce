import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@commerce/api'

import { API_URL, API_TOKEN, SHOPIFY_CUSTOMER_TOKEN_COOKIE } from '../const'

import fetchGraphqlApi from './utils/fetch-graphql-api'

import login from './operations/login'
import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'

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

const configJson: ShopifyConfig = {
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  customerCookie: SHOPIFY_CUSTOMER_TOKEN_COOKIE,
  cartCookie: process.env.SHOPIFY_CART_COOKIE ?? 'shopify_checkoutId',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
  applyLocale: true,
}

const config = new Config(configJson)

export const provider = {
  config: configJson,
  operations: { getSiteInfo, getPage, getAllPages, login },
}

export type Provider = typeof provider

export type ShopifyAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): ShopifyAPI<P> {
  return commerceApi(customProvider)
}

export function getConfig(userConfig?: Partial<ShopifyConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<ShopifyConfig>) {
  return config.setConfig(newConfig)
}
