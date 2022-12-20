import type { GetProductOperation } from '@vercel/commerce/types/product'

import { normalizeProduct } from '../../utils'

import { Product } from '@vercel/commerce/types/product'
import { OperationContext } from '@vercel/commerce/api/operations'
import { Provider, SwellConfig } from '../'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    variables,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<SwellConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const product = await config.fetch('products', 'get', [variables.slug])

    if (product && product.variants) {
      product.variants = product.variants?.results
    }

    return product ? { product: normalizeProduct(product) } : {}
  }

  return getProduct
}
