export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation() {
  function getAllProductPaths(): Promise<GetAllProductPathsResult> {
    return Promise.resolve({
      products: [].map((p) => ({ path: `/hello` })),
    })
  }

  return getAllProductPaths
}
