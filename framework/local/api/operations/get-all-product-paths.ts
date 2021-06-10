export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation() {
  function getAllProductPaths(): GetAllProductPathsResult {
    return {
      products: [].map((p) => ({ path: `/hello` })),
    }
  }

  return getAllProductPaths
}
