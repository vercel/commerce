import { Product } from '@commerce/types/product'
import { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { ElasticpathConfig, Provider } from '../index'
import normalizeProducts from '../../utils/normalize'
import epClient from '../../utils/ep-client'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = '',
    variables,
    config,
    related
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<ElasticpathConfig>
    preview?: boolean
    related?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    
    if(related) {
      return { products: [] };
    }
    
    // elastic path get all products
    let productsRes = await epClient.PCM.Limit(variables?.first || 10).All();
    let products = await normalizeProducts(productsRes.data)
    return {
      products: products,
      // products: data.products,
    }
  }
  return getAllProducts
}
