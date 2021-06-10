import { Product } from '@commerce/types/product'
import { OperationContext } from '@commerce/api/operations'

export type ProductVariables = { first?: number }

export default function getAllProductsOperation() {
  function getAllProducts(): { products: Product[] | any[] } {
    return {
      products: [],
    }
  }
  return getAllProducts
}
