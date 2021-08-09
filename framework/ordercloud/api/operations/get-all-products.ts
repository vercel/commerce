import type { Product } from '@commerce/types/product'
import type { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { RawProduct } from '@framework/types/product'
import type { OrdercloudConfig, Provider } from '../index'

import { normalize as normalizeProduct } from '@framework/utils/product'

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
  } = {}): Promise<{ products: Product[] }> {
    const { fetch } = commerce.getConfig(config)

    const rawProducts: RawProduct[] = await fetch<{ Items: RawProduct[] }>(
      'GET',
      '/products'
    ).then((response) => response.Items)

    return {
      products: rawProducts.map(normalizeProduct),
    }
  }

  return getAllProducts
}
