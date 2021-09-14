import { OperationContext } from '@commerce/api/operations'
import { Product } from '@commerce/types/product'
import { MedusaProduct } from '@framework/types'
import { MedusaConfig } from '..'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProductsPaths({
    config: cfg,
  }: {
    config?: Partial<MedusaConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    const config = commerce.getConfig(cfg)

    const results = await config.fetch('products', 'list', {})

    const productHandles = results.products
      ? results.products.map(({ handle }: MedusaProduct) => ({
          path: `/${handle}`,
        }))
      : []

    return {
      products: productHandles,
    }
  }

  return getAllProductsPaths
}
