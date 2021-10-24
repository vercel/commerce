import type { OperationContext } from '@commerce/api/operations'
import type { GetProductOperation } from '@commerce/types/product'

import type { CommercejsConfig, Provider } from '../index'

import { normalizeProduct } from '../../utils/normalize-product'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    config,
    variables,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<CommercejsConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { fetch } = commerce.getConfig(config)

    // Fetch a product by its permalink.
    const { data } = await fetch('products', 'retrieve', [
      variables?.slug,
      { type: 'permalink' },
    ])
    const productFormatted = normalizeProduct(data)

    return {
      product: productFormatted,
    }
  }

  return getProduct
}
