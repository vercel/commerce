import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { saleorProvider, SaleorProvider } from './provider'

export { saleorProvider }
export type { SaleorProvider }

export const saleorConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: "saleorCheckoutID",
}

export type SaleorConfig = Partial<CommerceConfig>

export type SaleorProps = {
  children?: ReactNode
  locale: string
} & SaleorConfig

export function CommerceProvider({ children, ...config }: SaleorProps) {
  return (
    <CoreCommerceProvider
      provider={saleorProvider}
      config={{ ...saleorConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
