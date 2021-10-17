import type { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'

import type { Product as CommercejsProduct } from '@chec/commerce.js/types/product'
import type { CommercejsConfig, Provider } from '../index'

import { normalizeProduct } from '../../utils/normalize-product'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    config,
  }: {
    config?: Partial<CommercejsConfig>
  } = {}): Promise<T['data']> {
    const { sdkFetch } = commerce.getConfig(config)
    const { data } = await sdkFetch('products', 'list')
    const productsFormatted = data?.map(normalizeProduct) || []

    return {
      products: productsFormatted,
    }
  }

  return getAllProducts
}
