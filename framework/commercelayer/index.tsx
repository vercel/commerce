import * as React from 'react'
import { ReactNode } from 'react'
import { localProvider } from './provider'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import useToken from './auth/use-token'

export const localConfig: CommerceConfig = {
  locale: 'en-us',
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
    <CoreCommerceProvider
      provider={localProvider}
      config={{ ...localConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
