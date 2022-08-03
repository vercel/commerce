import type { OperationContext } from '@vercel/commerce/api/operations'
import type { GetAllProductPathsOperation } from '@vercel/commerce/types/product'

import type { OlistConfig, Provider } from '../'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    config,
  }: {
    config?: Partial<OlistConfig>
  } = {}): Promise<T['data']> {
    const { service } = commerce.getConfig(config)

    const products = await service.product.list({ limit: 20 })

    return {
      products: products.map((product) => ({
        path: `/${product.slug}-${product.id}`,
      })),
    }
  }

  return getAllProductPaths
}
