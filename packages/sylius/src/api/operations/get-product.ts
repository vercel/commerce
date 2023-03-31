import type { Provider, SyliusConfig } from '../index'
import { Product } from '@vercel/commerce/types/product'
import { GetProductOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import { normalizeProduct } from '../../utils/normalize/normalize-product'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<SyliusConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    const config = commerce.getConfig(cfg)
    const syliusProduct = await config.fetch(
      'GET',
      `/api/v2/shop/products-by-slug/${variables!.slug}`
    )
    const product = normalizeProduct(syliusProduct)

    return {
      product,
    }
  }

  return getProduct
}
