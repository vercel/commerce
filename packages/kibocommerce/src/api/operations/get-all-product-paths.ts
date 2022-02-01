import { KiboCommerceConfig } from '../index'
import { getAllProductsQuery } from '../queries/get-all-products-query';
import { normalizeProduct } from '../../lib/normalize'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({commerce,}: any) {
  async function getAllProductPaths({ config }: {config?: KiboCommerceConfig } = {}): Promise<GetAllProductPathsResult> {
   
    const cfg = commerce.getConfig(config)

    const productVariables = {startIndex: 0, pageSize: 100};
    const { data } = await cfg.fetch(getAllProductsQuery, { variables: productVariables });

    const normalizedProducts =  data.products.items ? data.products.items.map( (item:any) => normalizeProduct(item, cfg)) : [];
    const products = normalizedProducts.map((product: any) => ({ path: product.path }))

    return Promise.resolve({
      products: products
    })
  }

  return getAllProductPaths
}
