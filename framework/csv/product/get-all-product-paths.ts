interface ProductPath {
  node: {
    path: string
  }
}

interface GetAllProductPaths {
  products: ProductPath[]
}

const getAllProductPaths = async (): Promise<GetAllProductPaths> => {
  return {
    products: [],
  }
}

export default getAllProductPaths
