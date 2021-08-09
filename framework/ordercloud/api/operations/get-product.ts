import type { OperationContext } from '@commerce/api/operations'
import type { RawProduct } from '@framework/types/product'
import type { Product } from '@commerce/types/product'
import type { GetProductOperation } from '@commerce/types/product'
import type { OrdercloudConfig, Provider } from '../index'

import { normalize as normalizeProduct } from '@framework/utils/product'

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
  } = {}): Promise<{ product: Product }> {
    const { fetch } = commerce.getConfig(config)

    const rawProduct: RawProduct = await fetch<RawProduct>(
      'GET',
      `/products/${variables?.slug}`
    )

    return {
      product: normalizeProduct(rawProduct),
    }
  }

  return getProduct
}
