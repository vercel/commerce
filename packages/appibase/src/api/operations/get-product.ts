import type { LocalConfig } from '../index'
import { Product } from '@vercel/commerce/types/product'
import { GetProductOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import { NormalizeProduct } from '../utils/normalize'

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
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    const { fetch } = commerce.getConfig(config)
    const { data: fetchedProduct }  =  await fetch(`/products/${variables?.slug}?include=products,variations,options,prices,stock_items,variations.variation_options`);
    
    return {
      product: NormalizeProduct(fetchedProduct),
    }
  }

  return getProduct
}
