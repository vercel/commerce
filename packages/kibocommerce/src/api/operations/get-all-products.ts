import { Product } from '@vercel/commerce/types/product'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { KiboCommerceConfig } from '../index'
import { getAllProductsQuery } from '../queries/get-all-products-query';
import { normalizeProduct } from '../../lib/normalize'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = getAllProductsQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<KiboCommerceConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {

    const cfg = commerce.getConfig(config)
    const { data } = await cfg.fetch(query);

    let normalizedProducts =  data.products.items ? data.products.items.map( (item:any) => normalizeProduct(item, cfg)) : [];

    return {
      products: normalizedProducts,
    }
  }
  return getAllProducts
}
