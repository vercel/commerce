import type { ReactNode } from 'react'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import {
  commercetoolsProvider,
  CommercetoolsProvider,
} from '@framework/provider'

export { commercetoolsProvider }
export type { CommercetoolsProvider }

export const commercetoolsConfig: CommerceConfig = {
  locale: 'en-US',
  cartCookie: '',
}

export type CommercetoolsConfig = Partial<CommerceConfig>

export type CommercetoolsProps = {
  children?: ReactNode
  locale: string
} & CommercetoolsConfig

export function CommerceProvider({ children, ...config }: CommercetoolsProps) {
  return (
    <CoreCommerceProvider
      provider={commercetoolsProvider}
      config={{ ...commercetoolsConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<CommercetoolsProvider>()
