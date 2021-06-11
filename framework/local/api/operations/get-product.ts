import type { LocalConfig } from '../index'
import { Product } from '@commerce/types/product'
import data from '../../data.json'

export default function getProductOperation() {
  async function getProduct({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    return Promise.resolve({
      product: data.products[0],
    })
  }

  return getProduct
}
