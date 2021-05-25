import type { ReactNode } from 'react'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import { aquilacmsProvider, AquilacmsProvider } from './provider'

export { aquilacmsProvider }
export type { AquilacmsProvider }

export const aquilacmsConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: 'aquilacms_cartId',
}

export type AquilacmsConfig = Partial<CommerceConfig>

export type AquilacmsProps = {
  children?: ReactNode
  locale: string
} & AquilacmsConfig

export function CommerceProvider({ children, ...config }: AquilacmsProps) {
  return (
    <CoreCommerceProvider
      provider={aquilacmsProvider}
      config={{ ...aquilacmsConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<AquilacmsProvider>()
