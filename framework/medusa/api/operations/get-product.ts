import type { OperationContext } from '@commerce/api/operations'
import type { GetProductOperation } from '@commerce/types/product'

import type { MedusaConfig, Provider } from '../index'

import { normalizeProduct } from '../../utils/normalizers/normalize-products'
import { MedusaProduct } from '../../types'

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

    const rawProducts: Promise<MedusaProduct[]> = restFetch<{
      products: MedusaProduct[]
    }>('GET', '/store/products').then((response) => response.products)

    const [products] = await Promise.all([rawProducts])

    const product = products.find(({ handle }) => handle === variables!.slug)

    console.log(variables)
    console.log('result is', product?.handle)

    return {
      product: product ? normalizeProduct(product) : undefined,
    }
  }

  return getProduct
}
