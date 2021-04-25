import { Product } from '@commerce/types'
import { getConfig, SwellConfig } from '../api'
import fetchAllProducts from '../api/utils/fetch-all-products'
import { ProductEdge } from '../schema'

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
  config?: SwellConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { limit: 100 } } = options ?? {}
  config = getConfig(config)

  const products = await fetchAllProducts({
    config,
    query: 'products',
    method: 'list',
    variables,
  })

  return {
    products: products?.map(({ slug: handle }) => ({
      node: {
        path: `/${handle}`,
      },
    })),
  }
}

export default getAllProductPaths
