import { getConfig, ShopifyConfig } from '../api'
import { ProductEdge } from '../schema'
import getAllProductsPathsQuery from '../utils/queries/get-all-products-paths-query'

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
  config?: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 100, sortKey: 'BEST_SELLING' } } =
    options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllProductsPathsQuery, {
    variables,
  })

  return {
    products: data.products?.edges?.map(
      ({ node: { handle } }: ProductEdge) => ({
        node: {
          path: `/${handle}`,
        },
      })
    ),
  }
}

export default getAllProductPaths
