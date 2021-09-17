import data from '../../data.json'
import normalizeProduct from '../../utils/normalize'
import epClient from '../../utils/ep-client'


export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation() {
  async function getAllProductPaths(): Promise<GetAllProductPathsResult> {
    let products = await epClient.PCM.Limit(200).All();
    let paths = [];
    for (let product of products.data) {
      paths.push({path: "/"+product.attributes.slug});
    }
    return await Promise.resolve({
      products: paths
    })
  }

  return getAllProductPaths
}
