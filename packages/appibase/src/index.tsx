import {
  getCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@vercel/commerce'
import { appibaseProvider, AppibaseProvider } from './provider'

export { appibaseProvider }
export type { AppibaseProvider }

export const CommerceProvider = getCommerceProvider(appibaseProvider)

export const useCommerce = () => useCoreCommerce<AppibaseProvider>()
