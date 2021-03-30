import type { CommerceAPIConfig } from '@commerce/api'

import {
  API_URL,
  REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  REACTION_CART_ID_COOKIE,
  REACTION_EMPTY_DUMMY_CART_ID,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
  SHOP_ID,
} from '../const'

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is missing and it's required to access your store`
  )
}

import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface ReactionCommerceConfig extends CommerceAPIConfig {}

export class Config {
  private config: ReactionCommerceConfig

  constructor(config: ReactionCommerceConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<ReactionCommerceConfig> = {}) {
    return Object.entries(userConfig).reduce<ReactionCommerceConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<ReactionCommerceConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  locale: 'en-US',
  commerceUrl: API_URL,
  cartCookie: REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  cartIdCookie: REACTION_CART_ID_COOKIE,
  dummyEmptyCartId: REACTION_EMPTY_DUMMY_CART_ID,
  cartCookieMaxAge: SHOPIFY_COOKIE_EXPIRE,
  fetch: fetchGraphqlApi,
  customerCookie: SHOPIFY_CUSTOMER_TOKEN_COOKIE,
  shopId: SHOP_ID,
})

export function getConfig(userConfig?: Partial<ReactionCommerceConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<ReactionCommerceConfig>) {
  return config.setConfig(newConfig)
}
