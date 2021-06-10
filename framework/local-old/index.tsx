import React from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { localProvider } from './provider'
import type { LocalProvider } from './provider'

export { localProvider }
export type { LocalProvider }

export const localConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: '',
}

export function CommerceProvider({
  children,
  ...config
}: {
  children?: React.ReactNode
  locale: string
} & Partial<CommerceConfig>) {
  return (
    <CoreCommerceProvider
      provider={localProvider}
      config={{ ...localConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<LocalProvider>()
