import * as React from 'react'
import { ReactNode } from 'react'
import { commerceLayerProvider } from './provider'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

export const commerceLayerConfig: CommerceConfig = {
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
      provider={commerceLayerProvider}
      config={{ ...commerceLayerConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
