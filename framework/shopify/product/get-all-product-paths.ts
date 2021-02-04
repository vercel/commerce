import { getConfig, ShopifyConfig } from '../api'
import { ProductEdge } from '../schema'
import getAllProductsPathsQuery from '../utils/queries/get-all-products-paths-query'

type ReturnType = {
  products: any[]
}

const getAllProductPaths = async (options?: {
  variables?: any
  config?: ShopifyConfig
  previe?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllProductsPathsQuery, {
    variables,
  })

  const edges = data.products?.edges
  const productInfo = data.products?.productInfo
  const hasNextPage = productInfo?.hasNextPage

  return {
    products: edges.map(({ node: { handle } }: ProductEdge) => ({
      node: {
        path: `/${handle}`,
      },
    })),
  }
}

export default getAllProductPaths
