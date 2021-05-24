import { Product } from '@commerce/types'
import { getConfig, ShopifyConfig } from '../api'
import { QueryRoot, QueryRootProductsArgs } from '../schema'
import { getAllProductsQuery } from '../utils/queries'
import { normalizeProduct } from '../utils/normalize'

type Variables = {
  first?: number
  field?: string
}

type ReturnType = {
  products: Product[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)
  let products: Product[] = []

  const { data } = await config!.fetch<QueryRoot, QueryRootProductsArgs>(
    getAllProductsQuery,
    {
      variables,
    },
    {
      ...(config.locale && {
        headers: {
          'Accept-Language': config.locale!,
        },
      }),
    }
  )

  return {
    products: data.products.edges.map(({ node: p }) => normalizeProduct(p)),
  }
}

export default getAllProducts
