import * as React from 'react'
import { ReactNode } from 'react'
import { ordercloudProvider } from './provider'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

export const ordercloudConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: 'session',
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
