import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { provider } from './provider'
import type { Provider } from './provider'
import { requireConfigValue } from './isomorphic-config'

export type SpreeProps = {
  children: ReactNode
  locale: string
}

export const spreeCommerceConfigDefaults: CommerceConfig = {
  locale: requireConfigValue('defaultLocale') as string,
  cartCookie: requireConfigValue('cartCookieName') as string,
}

export type SpreeConfig = CommerceConfig

export function CommerceProvider({ children, ...restProps }: SpreeProps) {
  return (
    <CoreCommerceProvider<Provider>
      provider={provider}
      config={{ ...spreeCommerceConfigDefaults, ...restProps }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<Provider>()
