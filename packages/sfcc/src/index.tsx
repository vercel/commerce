import {
  getCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@vercel/commerce'
import { sfccProvider, SfccProvider } from './provider'

export { sfccProvider }
export type { SfccProvider }

export const CommerceProvider = getCommerceProvider(sfccProvider)

export const useCommerce = () => useCoreCommerce<SfccProvider>()
