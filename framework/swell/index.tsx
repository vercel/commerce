import * as React from 'react'
import swell from 'swell-js'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { swellProvider, SwellProvider } from './provider'
import {
  SWELL_CHECKOUT_ID_COOKIE,
  SWELL_STORE_ID,
  SWELL_PUBLIC_KEY,
} from './const'
swell.init(SWELL_STORE_ID, SWELL_PUBLIC_KEY)

export { swellProvider }
export type { SwellProvider }

export const swellConfig: any = {
  locale: 'en-us',
  cartCookie: SWELL_CHECKOUT_ID_COOKIE,
  swell,
}

export type SwellConfig = Partial<CommerceConfig>

export type SwellProps = {
  children?: ReactNode
  locale: string
} & SwellConfig

export function CommerceProvider({ children, ...config }: SwellProps) {
  return (
    <CoreCommerceProvider
      // TODO: Fix this type
      provider={swellProvider as any}
      config={{ ...swellConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
