import { getCommerceProvider, useCommerce as useCoreCommerce } from '@vercel/commerce'
import { kiboCommerceProvider, KibocommerceProvider } from './provider'

export { kiboCommerceProvider }
export type { KibocommerceProvider }

export const CommerceProvider = getCommerceProvider(kiboCommerceProvider)

export const useCommerce = () => useCoreCommerce()
