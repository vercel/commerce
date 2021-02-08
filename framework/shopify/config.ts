import type { CommerceConfig } from '@commerce'
import handleFetchResponse from './utils/handle-fetch-response'

export const SHOPIFY_CHECKOUT_ID_COOKIE = 'shopify_checkoutId'

export const SHOPIFY_CHECKOUT_URL_COOKIE = 'shopify_checkoutUrl'

export const SHOPIFY_CUSTOMER_TOKEN_COOKIE = 'shopify_customerToken'

export const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

export const API_URL = `https://${STORE_DOMAIN}/api/2021-01/graphql.json`

export const API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

export type ShopifyConfig = {
  locale: string
  cartCookie: string
  storeDomain: string | undefined
} & CommerceConfig

const shopifyConfig: ShopifyConfig = {
  locale: 'en-us',
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  storeDomain: STORE_DOMAIN,
  async fetcher({ method = 'POST', query, variables }) {
    return handleFetchResponse(
      await fetch(API_URL, {
        method,
        body: JSON.stringify({ query, variables }),
        headers: {
          'X-Shopify-Storefront-Access-Token': API_TOKEN!,
          'Content-Type': 'application/json',
        },
      })
    )
  },
}

export default shopifyConfig
