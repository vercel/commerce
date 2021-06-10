import { Product } from '@commerce/types/product'

import type { OperationContext } from '@commerce/api/operations'
import type { Provider } from '../index'

export type ProductVariables = { first?: number }

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts(): Promise<{ products: Product[] | any[] }> {
    return Promise.resolve({
      products: [],
    })
  }
  return getAllProducts
}
