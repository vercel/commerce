import type { OperationContext } from '@commerce/api/operations'
import type { GetProductOperation } from '@commerce/types/product'

import type { RawProduct } from '../../types/product'
import type { OrdercloudConfig, Provider } from '../index'

import { normalize as normalizeProduct } from '../../utils/product'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    config,
    variables,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<OrdercloudConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    // Get fetch from the config
    const { fetch } = commerce.getConfig(config)

    // Get a single product
    const rawProduct: RawProduct = await fetch<RawProduct>(
      'GET',
      `/products/${variables?.slug}`
    )

    return {
      // Normalize product to commerce schema
      product: normalizeProduct(rawProduct),
    }
  }

  return getProduct
}
