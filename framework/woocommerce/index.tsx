import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { wooCommerceProvider } from './provider'
import type { WooCommerceProvider } from './provider'
import { WOOCOMMERCE_CHECKOUT_ID_COOKIE } from './const'

export { wooCommerceProvider }
export type { WooCommerceProvider }

export const wooCommerceConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: WOOCOMMERCE_CHECKOUT_ID_COOKIE,
}

export type WooCommerceConfig = Partial<CommerceConfig>

export type ShopifyProps = {
  children?: ReactNode
} & WooCommerceConfig

export function CommerceProvider({ children, ...config }: ShopifyProps) {
  return (
    <CoreCommerceProvider
      provider={wooCommerceProvider}
      config={{ ...wooCommerceConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<WooCommerceProvider>()
