import { getConfig, SaleorConfig } from '../api'
import fetchAllProducts from '../api/utils/fetch-all-products'
import { ProductCountableEdge } from '../schema'
import { getAllProductsPathsQuery } from '../utils/queries'

type ProductPath = {
  path: string
}

export type ProductPathNode = {
  node: ProductPath
}

type ReturnType = {
  products: ProductPathNode[]
}

const getAllProductPaths = async (options?: {
  variables?: any
  config?: SaleorConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 100 } } = options ?? {}
  config = getConfig(config)

  const products = await fetchAllProducts({
    config,
    query: getAllProductsPathsQuery,
    variables,
  })

  return {
    products: products?.map(({ node: { slug } }: ProductCountableEdge) => ({
      node: {
        path: `/${slug}`,
      },
    })),
  }
}

export default getAllProductPaths
