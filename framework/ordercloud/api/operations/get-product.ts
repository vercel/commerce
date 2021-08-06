import type { OrdercloudConfig } from '../index'
import { Product } from '@commerce/types/product'
import { GetProductOperation } from '@commerce/types/product'
import data from '../../data.json'
import type { OperationContext } from '@commerce/api/operations'

export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<OrdercloudConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    return {
      product: null // data.products.find(({ slug }) => slug === variables!.slug),
    }
  }

  return getProduct
}
