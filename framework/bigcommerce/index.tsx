import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { bigcommerceProvider } from './provider'
import type { BigcommerceProvider } from './provider'

export { bigcommerceProvider }
export type { BigcommerceProvider }

export const CommerceProvider = getCommerceProvider(bigcommerceProvider)

export const useCommerce = () => useCoreCommerce<BigcommerceProvider>()
