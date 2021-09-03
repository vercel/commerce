import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { vendureProvider, VendureProvider } from './provider'

export { vendureProvider }
export type { VendureProvider }

export const CommerceProvider = getCommerceProvider(vendureProvider)

export const useCommerce = () => useCoreCommerce()
