import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { wooCommerceProvider, WooCommerceProvider } from './provider'

export { wooCommerceProvider }
export type { WooCommerceProvider }

export const CommerceProvider = getCommerceProvider(wooCommerceProvider)

export const useCommerce = () => useCoreCommerce<WooCommerceProvider>()
