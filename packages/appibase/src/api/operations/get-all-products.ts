import { Product } from '@vercel/commerce/types/product'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { LocalConfig, Provider } from '../index'
import { NormalizeProduct } from '../utils/normalize'
import type { AppibaseProduct } from '../../types'

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
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {

    const { fetch } = commerce.getConfig(config)

    const { data: fetchedProducts }  =  await fetch('/products?filter[is_parent_true]=true&include=prices,options');

    const products = fetchedProducts.map((p : AppibaseProduct) => <Product> NormalizeProduct(p))

    return {
      products
    }
  }
  return getAllProducts
}
