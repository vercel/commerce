import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { swellProvider, SwellProvider } from './provider'

export { swellProvider }
export type { SwellProvider }

export const CommerceProvider = getCommerceProvider(swellProvider)

export const useCommerce = () => useCoreCommerce<SwellProvider>()
