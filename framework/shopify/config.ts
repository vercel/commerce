import { CommerceError, FetcherError } from '@commerce/utils/errors'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from './const'
import type { CommerceConfig } from '@commerce'

export type ShopifyConfig = {
  locale: string
  cartCookie: string
  storeDomain: string | undefined
} & CommerceConfig

export const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
export const API_URL = `https://${STORE_DOMAIN}/api/2021-01/graphql.json`
export const API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

const shopifyConfig: ShopifyConfig = {
  locale: 'en-us',
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  storeDomain: STORE_DOMAIN,
  async fetcher({ method = 'POST', variables, query }) {
    const res = await fetch(API_URL, {
      method,
      body: JSON.stringify({ query, variables }),
      headers: {
        'X-Shopify-Storefront-Access-Token': API_TOKEN!,
        'Content-Type': 'application/json',
      },
    })

    const json = await res.json()

    if (json.errors) {
      throw new FetcherError({
        errors: json.errors ?? [
          { message: 'Failed to fetch Shopify Storefront API' },
        ],
        status: res.status,
      })
    }

    return { data: json.data, res }
  },
}

export default shopifyConfig
