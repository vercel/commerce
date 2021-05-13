import { SwellProduct } from '../types'
import { getConfig, SwellConfig } from '../api'

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
  let { config, variables = [{ limit: 100 }] } = options ?? {}
  config = getConfig(config)

  const { results } = await config.fetch('products', 'list', [
    {
      limit: variables.first,
    },
  ])

  return {
    products: results?.map(({ slug: handle }: SwellProduct) => ({
      node: {
        path: `/${handle}`,
      },
    })),
  }
}

export default getAllProductPaths
