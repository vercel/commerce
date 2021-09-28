import type { ElasticpathConfig } from '../index'
import { Product } from '@commerce/types/product'
import { GetProductOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import {normalizeProduct} from '../../utils/normalize'
import epClient from '../../utils/ep-client'


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
    config?: Partial<ElasticpathConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    let variablesS = ''
    if (typeof variables?.slug == "undefined") {
      variablesS = ''
    } else {
      variablesS = variables.slug;
    }
    let {data:[product]} = await epClient.PCM.Filter({
      eq: {
        slug: variablesS 
      }
    }).All();
    let productData = await normalizeProduct(product, true)
    return {
      // product: data.products.find(({ slug }) => slug === variables!.slug),
      product: productData
    }
  }

  return getProduct
}
