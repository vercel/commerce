import { ReactNode } from 'react'
import * as React from 'react'

import {
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import shopifyConfig, { ShopifyConfig } from './config'

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
