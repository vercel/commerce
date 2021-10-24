import { commercjsProvider, CommercejsProvider } from './provider'
import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'

export { commercjsProvider }
export type { CommercejsProvider }

export const CommerceProvider = getCommerceProvider(commercjsProvider)

export const useCommerce = () => useCoreCommerce()
