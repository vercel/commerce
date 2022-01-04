import type { KiboCommerceConfig } from '../index'
import { Product } from '@commerce/types/product'
import { GetProductOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import { getProductQuery } from '../queries/get-product-query'
import { normalizeProduct } from '../../lib/normalize'

export default function getProductOperation({
  commerce,
}: OperationContext<any>) {

  async function getProduct<T extends GetProductOperation>({
    query = getProductQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<KiboCommerceConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    const productVariables = { productCode: variables?.slug}
  
    const cfg = commerce.getConfig(config)
    const { data } = await cfg.fetch(query, { variables: productVariables });

    const normalizedProduct = normalizeProduct(data.product, cfg)
   
    return {
      product: normalizedProduct 
    }
  }

  return getProduct
}
