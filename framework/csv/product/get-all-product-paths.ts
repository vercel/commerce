import api from '../api/product'

interface ProductPath {
  node: {
    path: string
  }
}

interface GetAllProductPaths {
  products: ProductPath[]
}

const getAllProductPaths = async (): Promise<GetAllProductPaths> => {
  const products = await api.list().then((products) =>
    products.map((product) => ({
      node: {
        path: product.path || product.id,
      },
    }))
  )

  return {
    products: products as ProductPath[],
  }
}

export default getAllProductPaths
