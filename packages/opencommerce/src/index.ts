import {
  getCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@vercel/commerce'
import { openCommerceProvider, OpenCommerceProvider } from './provider'

export { openCommerceProvider }
export type { OpenCommerceProvider }

export const CommerceProvider = getCommerceProvider(openCommerceProvider)

export const useCommerce = () => useCoreCommerce<OpenCommerceProvider>()
