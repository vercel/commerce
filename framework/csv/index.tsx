import * as React from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { csvProvider, CSVProvider } from './provider'
import { CSVConfig } from './common/types'

export { csvProvider }
export type { CSVProvider }

export const csvConfig: CommerceConfig = {
  locale: 'en-us',
}

export type CSVProps = {
  children?: React.ReactNode
  locale: string
} & CSVConfig

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
