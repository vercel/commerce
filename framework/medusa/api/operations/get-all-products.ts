import { Product } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { MedusaConfig } from '../'
import { normalizeProduct } from '@framework/utils/normalizers/normalize-products'
import { MedusaProduct } from '@framework/types'

export type ProductVariables = { first?: number }

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts({
    config: cfg,
    variables,
  }: {
    query?: string
    variables?: ProductVariables
    config?: Partial<MedusaConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    const config = commerce.getConfig(cfg)
    const query = variables?.first && { limit: variables.first }

    const results = await config.fetch(
      'products',
      'list',
      query ? { query: query } : {}
    )

    const products: Product[] = results.data?.products
      ? results.data.products.map((product: MedusaProduct) =>
          normalizeProduct(product)
        )
      : []

    return {
      products,
    }
  }
  return getAllProducts
}
