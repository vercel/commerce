import type { FC, ReactNode } from 'react'
import {
  Provider,
  CommerceProviderProps,
  CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@vercel/commerce'
import { spreeProvider } from './provider'
import type { SpreeProvider } from './provider'
import { SWRConfig } from 'swr'
import handleTokenErrors from './utils/handle-token-errors'
import useLogout from '@vercel/commerce/auth/use-logout'

export { spreeProvider }
export type { SpreeProvider }

export const WithTokenErrorsHandling: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const logout = useLogout()

  return (
    <SWRConfig
      value={{
        onError: (error, _key) => {
          handleTokenErrors(error, () => void logout())
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}

export const getCommerceProvider = <P extends Provider>(provider: P) => {
  return function CommerceProvider({
    children,
    ...props
  }: CommerceProviderProps) {
    return (
      <CoreCommerceProvider provider={{ ...provider, ...props }}>
        <WithTokenErrorsHandling>{children}</WithTokenErrorsHandling>
      </CoreCommerceProvider>
    )
  }
}

export const CommerceProvider =
  getCommerceProvider<SpreeProvider>(spreeProvider)

export const useCommerce = () => useCoreCommerce<SpreeProvider>()
