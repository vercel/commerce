// import data from '../../data.json'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation() {
  function getAllProductPaths(): Promise<GetAllProductPathsResult> {
    console.log('getAllProductPaths called.')

    return Promise.resolve({
      // products: data.products.map(({ path }) => ({ path })),
      // TODO: Return Storefront [{ path: '/long-sleeve-shirt' }, ...] from Spree products. Paths using product IDs are fine too.
      products: [],
    })
  }

  return getAllProductPaths
}
