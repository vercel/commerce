import { commercejsProvider, CommercejsProvider } from './provider'
import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'

export { commercejsProvider }
export type { CommercejsProvider }

export const CommerceProvider = getCommerceProvider(commercejsProvider)

export const useCommerce = () => useCoreCommerce()
