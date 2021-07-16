import * as React from 'react'
import { ReactNode } from 'react'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import { vendureProvider } from './provider'

export const vendureConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: 'session',
}

export type VendureConfig = Partial<CommerceConfig>

export type VendureProps = {
  children?: ReactNode
  locale: string
} & VendureConfig

export function CommerceProvider({ children, ...config }: VendureProps) {
  return (
    <CoreCommerceProvider
      provider={vendureProvider}
      config={{ ...vendureConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
