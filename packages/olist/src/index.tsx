import { olistProvider, OlistProvider } from './provider'
import {
  getCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@vercel/commerce'

export { olistProvider }
export type { OlistProvider }

export const CommerceProvider = getCommerceProvider(olistProvider)

export const useCommerce = () => useCoreCommerce()
