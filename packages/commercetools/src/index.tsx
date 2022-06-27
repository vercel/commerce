import {
  getCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@vercel/commerce'
import { commercetoolsProvider, CommercetoolsProvider } from './provider'

export { commercetoolsProvider }
export type { CommercetoolsProvider }

export const CommerceProvider = getCommerceProvider(commercetoolsProvider)

export const useCommerce = () => useCoreCommerce<CommercetoolsProvider>()
