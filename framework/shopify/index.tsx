import { ReactNode } from 'react'
import * as React from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { CommerceError, FetcherError } from '@commerce/utils/errors'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from './const'

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

export type ShopifyConfig = Partial<CommerceConfig>

export const shopifyConfig: ShopifyConfig = {
  locale: 'en-us',
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  async fetcher({ method = 'POST', variables, query }) {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2021-01/graphql.json`,
      {
        method,
        body: JSON.stringify({ query, variables }),
        headers: {
          'X-Shopify-Storefront-Access-Token':
            process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    )

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

export type ShopifyProps = {
  children?: ReactNode
  locale: string
} & ShopifyConfig

export function CommerceProvider({ children, ...config }: ShopifyProps) {
  return (
    <CoreCommerceProvider config={{ ...shopifyConfig, ...config }}>
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
