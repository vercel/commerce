import type { OperationContext } from '@vercel/commerce/api/operations'
import type { GetAllProductsOperation } from '@vercel/commerce/types/product'

import type { OlistConfig, Provider } from '..'
import { mapItemRawToCommerceResponse } from '../../utils/product'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<OlistConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { service } = commerce.getConfig(config)

    const products = await service.product.list({ limit: 20 })

    return {
      products: products.map(mapItemRawToCommerceResponse),
    }
  }

  return getAllProducts
}
