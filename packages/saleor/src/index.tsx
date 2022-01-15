import { getCommerceProvider, useCommerce as useCoreCommerce } from '@vercel/commerce'
import { saleorProvider, SaleorProvider } from './provider'

export { saleorProvider }
export type { SaleorProvider }

export const CommerceProvider = getCommerceProvider(saleorProvider)

export const useCommerce = () => useCoreCommerce<SaleorProvider>()
