import type { Product } from '@commerce/types/product'

export default function getProductOperation() {
  async function getProduct(): Promise<Product | {} | any> {
    return {
      product: [],
    }
  }

  return getProduct
}
