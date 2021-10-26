import { OperationContext } from '@commerce/api/operations'
import { GetAllProductPathsOperation, Product } from '@commerce/types/product'
import { MedusaProduct } from '@framework/types'
import { MedusaConfig, Provider } from '..'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductsPaths<T extends GetAllProductPathsOperation>({
    config,
  }: {
    config?: Partial<MedusaConfig>
  } = {}): Promise<T['data']> {
    const { restFetch } = commerce.getConfig(config)

    console.log('here paths')

    const rawProducts: MedusaProduct[] = await restFetch<{
      products: MedusaProduct[]
    }>('GET', 'store/products').then((response) => response.products)

    return {
      products: rawProducts.map((product) => ({ path: `/${product.handle}` })),
    }
  }

  return getAllProductsPaths
}
