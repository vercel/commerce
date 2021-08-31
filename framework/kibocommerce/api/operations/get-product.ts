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
    const { products } = await commerce.getAllProducts();
    const product = products?.find((product: any)=> product.slug === variables?.slug );
   
    const productVariables = { productCode: product.id}
  
    const cfg = commerce.getConfig(config)
    const { data } = await cfg.fetch(query, { variables: productVariables });

    const normalizedProduct = normalizeProduct(data.product)
   
    return {
      product: normalizedProduct 
    }
  }

  return getProduct
}
