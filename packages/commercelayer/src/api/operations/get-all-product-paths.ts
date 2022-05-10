import getContentData from '../utils/getContentData'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation() {
  async function getAllProductPaths(): Promise<GetAllProductPathsResult> {
    const products = await getContentData()
    return Promise.resolve({
      products: products.map(({ path }) => ({ path: path || '' })),
    })
  }

  return getAllProductPaths
}
