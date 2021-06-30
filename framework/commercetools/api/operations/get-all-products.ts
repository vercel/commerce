import { Product } from '@commerce/types/product'
import { Provider, CommercetoolsConfig } from '@framework/api'
import { normalizeProduct } from '@framework/lib/normalize'
import { OperationContext } from '@commerce/api/operations'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts(opts?: {
    config?: Partial<CommercetoolsConfig>
    preview?: boolean
  }): Promise<{ products: Product[] }>

  async function getAllProducts({
    config: cfg,
  }: {
    config?: Partial<CommercetoolsConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    const config = commerce.getConfig(cfg)
    const data: any = await config.fetchProducts()

    const prods = data.body.results.map((prod: any) => normalizeProduct(prod))

    return {
      products: prods,
    }
  }

  return getAllProducts
}
