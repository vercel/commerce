import { Product } from '@commerce/types/product'
import { GetProductOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import { MedusaProduct } from '@framework/types'
import { normalizeProduct } from '@framework/utils/normalizers/normalize-products'
import { MedusaConfig, Provider } from '..'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    config,
    variables,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<MedusaConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { restFetch } = commerce.getConfig(config)

    console.log('here')

    const rawProducts: MedusaProduct[] = await restFetch<{
      products: MedusaProduct[]
    }>('GET', '/store/products').then((response) => response.products)

    console.log(rawProducts)

    const product = rawProducts.find(({ handle }) => handle === variables!.slug)

    return {
      product: normalizeProduct(product!),
    }
  }

  return getProduct
}
