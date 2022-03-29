import { Product } from '@vercel/commerce/types/product'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { SFCCConfig, Provider } from '../index'
import data from '../../data.json'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<SFCCConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    console.log(" == API == operations == getAllProductsOperation: ", variables)
    return {
      products: data.products,
    }
  }
  return getAllProducts
}
