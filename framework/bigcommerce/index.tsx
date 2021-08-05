import {
  CommerceProvider as CoreCommerceProvider,
  CommerceProviderProps,
  useCommerce as useCoreCommerce,
} from '@commerce'
import { bigcommerceProvider } from './provider'
import type { BigcommerceProvider } from './provider'

export { bigcommerceProvider }
export type { BigcommerceProvider }

export function CommerceProvider({
  children,
  ...props
}: CommerceProviderProps) {
  return (
    <CoreCommerceProvider provider={{ ...bigcommerceProvider, ...props }}>
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<BigcommerceProvider>()
