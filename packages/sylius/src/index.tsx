import { getCommerceProvider, useCommerce as useCoreCommerce } from '@vercel/commerce'
import { syliusProvider, SyliusProvider } from './provider'

export { syliusProvider }
export type { SyliusProvider }

export const CommerceProvider = getCommerceProvider(syliusProvider)

export const useCommerce = () => useCoreCommerce<SyliusProvider>()
