import data from '../../data.json'
import { gateway as MoltinGateway } from '@moltin/sdk'
import normalizeProduct from '../../utils/normalize'

const Moltin = MoltinGateway({
  client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID
})

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation() {
  async function getAllProductPaths(): Promise<GetAllProductPathsResult> {
    let products = await Moltin.Products.Limit(200).All();
    let normalizeProducts = await normalizeProduct(products.data)
    let productPaths = normalizeProducts.map(({ path }) => ({ path }));
    return await Promise.resolve({
      products: productPaths
    })
  }

  return getAllProductPaths
}
