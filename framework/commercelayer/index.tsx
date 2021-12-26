import * as React from 'react'
import { ReactNode } from 'react'
import { CommercelayerProvider } from './provider'
import {
  CommerceConfig,
  CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import useToken from './auth/use-token'

export const commercelayerConfig: CommerceConfig = {
  locale: 'en-US',
  cartCookie: 'session',
}

export function CommerceProvider({
  children,
  ...config
}: {
  children?: ReactNode
  locale: string
} & Partial<CommerceConfig>) {
  const token = useToken()
  if (token) config.cartCookie = token
  return (
    <CoreCommerceProvider provider={CommercelayerProvider}>
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
