import { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { MedusaConfig, Provider } from '../'
import { normalizeProduct } from '@framework/utils/normalizers/normalize-products'
import { MedusaProduct } from '@framework/types'

export type ProductVariables = { first?: number }

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<MedusaConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { restFetch } = commerce.getConfig(config)

    const rawProducts: MedusaProduct[] = await restFetch<{
      products: MedusaProduct[]
    }>('GET', '/store/products').then((response) => response.products)

    return {
      products: rawProducts.map(normalizeProduct),
    }
  }

  return getAllProducts
}
