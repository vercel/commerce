import type { OperationContext } from '@vercel/commerce/api/operations'
import type { GetProductOperation } from '../../types/product'
import type { CommercejsConfig, Provider } from '../index'
import { normalizeProduct } from '../../utils/normalize-product'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    config,
    variables,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<CommercejsConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { sdkFetch } = commerce.getConfig(config)

    // Fetch a product by its permalink.
    const product = await sdkFetch(
      'products',
      'retrieve',
      variables?.slug || '',
      {
        type: 'permalink',
      }
    )

    const { data: variants } = await sdkFetch(
      'products',
      'getVariants',
      product.id
    )

    const productFormatted = normalizeProduct(product, variants)

    return {
      product: productFormatted,
    }
  }

  return getProduct
}
