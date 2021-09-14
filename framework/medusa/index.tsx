import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { medusaProvider, MedusaProvider } from './provider'

export { medusaProvider }
export type { MedusaProvider }

export const CommerceProvider = getCommerceProvider(medusaProvider)

export const useCommerce = () => useCoreCommerce<MedusaProvider>()
