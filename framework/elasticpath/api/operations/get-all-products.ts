import { Product } from '@commerce/types/product'
import { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { ElasticpathConfig, Provider } from '../index'
import normalizeProduct from '../../utils/normalize'
import epClient from '../../utils/ep-client'

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
    config?: Partial<ElasticpathConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    // elastic path get all products
    let products = await epClient.PCM.Limit(200).All();
    let normalizeProducts = await normalizeProduct(products.data)
    return {
      products: normalizeProducts,
      // products: data.products,
    }
  }
  return getAllProducts
}
