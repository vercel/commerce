import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { spreeProvider } from './provider'
import type { SpreeProvider } from './provider'

export { spreeProvider }
export type { SpreeProvider }

export const CommerceProvider =
  getCommerceProvider<SpreeProvider>(spreeProvider)

export const useCommerce = () => useCoreCommerce<SpreeProvider>()
