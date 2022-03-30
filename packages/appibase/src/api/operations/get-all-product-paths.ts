import data from '../../data.json'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation() {
  function getAllProductPaths(): Promise<GetAllProductPathsResult> {
    console.log('GETTING ALL PATHS');

    return Promise.resolve({
      products: [] //data.products.map(({ path }) => ({ path })),
    })
  }

  return getAllProductPaths
}
