import * as React from 'react'
import { ReactNode } from 'react'
import { ordercloudProvider } from './provider'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import { CART_COOKIE, LOCALE } from './constants'

export const ordercloudConfig: CommerceConfig = {
  locale: LOCALE,
  cartCookie: CART_COOKIE,
}

export function CommerceProvider({
  children,
  ...config
}: {
  children?: ReactNode
  locale: string
} & Partial<CommerceConfig>) {
  return (
    <CoreCommerceProvider
      provider={ordercloudProvider}
      config={{ ...ordercloudConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
