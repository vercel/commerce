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

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText
  } catch (error) {
    return res.statusText
  }
}

async function getError(res: Response) {
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const data = await res.json()
    return new FetcherError({ errors: data.errors, status: res.status })
  }
  return new FetcherError({ message: await getText(res), status: res.status })
}

const shopifyConfig: ShopifyConfig = {
  locale: 'en-us',
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  storeDomain: STORE_DOMAIN,
  async fetcher({ method = 'POST', query, variables }) {
    const res = await fetch(API_URL, {
      method,
      body: JSON.stringify({ query, variables }),
      headers: {
        'X-Shopify-Storefront-Access-Token': API_TOKEN!,
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      const { data, errors } = await res.json()

      if (errors && errors.length) {
        throw new CommerceError({
          message: errors[0].message,
        })
      }
      return data
    }

    throw await getError(res)
  },
}

export default shopifyConfig
