import type { ReactNode } from 'react'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import { elasticpathProvider } from './provider'
import type { ElasticpathProvider } from './provider'

export { elasticpathProvider }
export type { ElasticpathProvider }

export const elasticpathConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: 'bc_cartId',
}

export type ElasticpathConfig = Partial<CommerceConfig>

export type ElasticpathProps = {
  children?: ReactNode
  locale: string
} & ElasticpathConfig

export function CommerceProvider({ children, ...config }: ElasticpathProps) {
  return (
    <CoreCommerceProvider
      provider={elasticpathProvider}
      config={{ ...elasticpathConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<ElasticpathProvider>()