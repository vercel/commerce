import * as React from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { csvProvider, CSVProvider } from './provider'
import { CSVConfig } from './common/types'

export const csvConfig: CommerceConfig = {
  cartCookie: '',
  locale: 'en-us',
}

export type CSVProps = {
  children?: React.ReactNode
  locale: string
} & CSVConfig

export { csvProvider }
export type { CSVProvider }

export function CommerceProvider({ children, ...config }: CSVProps) {
  return (
    <CoreCommerceProvider
      provider={csvProvider}
      config={{ ...csvConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
