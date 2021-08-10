import type { OrdercloudConfig, Provider } from '../index'
import type { OperationContext } from '@commerce/api/operations'
import type { GetAllProductPathsOperation } from '@commerce/types/product'
import { RawProduct } from '@framework/types/product'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    config,
  }: {
    config?: Partial<OrdercloudConfig>
  } = {}): Promise<T['data']> {
    // Get fetch from the config
    const { fetch } = commerce.getConfig(config)

    // Get all products
    const rawProducts: RawProduct[] = await fetch<{ Items: RawProduct[] }>(
      'GET',
      '/products'
    ).then((response) => response.Items)

    return {
      // Match a path for every product retrieved
      products: rawProducts.map((product) => ({ path: `/${product.ID}` })),
    }
  }

  return getAllProductPaths
}
