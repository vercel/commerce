import type { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'

import type { RawProduct } from '../../types/product'
import type { OrdercloudConfig, Provider } from '../index'

import { normalize as normalizeProduct } from '../../utils/product'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<OrdercloudConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    // Get fetch from the config
    const { restBuyerFetch } = commerce.getConfig(config)

    // Get all products
    const rawProducts: RawProduct[] = await restBuyerFetch<{
      Items: RawProduct[]
    }>('GET', '/me/products').then((response) => response.Items)

    return {
      // Normalize products to commerce schema
      products: rawProducts.map(normalizeProduct),
    }
  }

  return getAllProducts
}
