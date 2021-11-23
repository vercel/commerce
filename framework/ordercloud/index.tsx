import { ordercloudProvider, OrdercloudProvider } from './provider'
import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'

export { ordercloudProvider }
export type { OrdercloudProvider }

export const CommerceProvider = getCommerceProvider(ordercloudProvider)

export const useCommerce = () => useCoreCommerce()
