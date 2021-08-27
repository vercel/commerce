import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { shopifyProvider } from './provider'
import type { ShopifyProvider } from './provider'

export { shopifyProvider }
export type { ShopifyProvider }

export const CommerceProvider = getCommerceProvider(shopifyProvider)

export const useCommerce = () => useCoreCommerce<ShopifyProvider>()
