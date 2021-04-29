import { getConfig, ShopifyConfig } from '../api'
import { GetAllProductsQuery, Product as ShopifyProduct } from '../schema'
import { getAllProductsQuery } from '../utils/queries'
import { normalizeProduct } from '../utils/normalize'
import { Product } from '@commerce/types'

type Variables = {
  first?: number
  field?: string
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: ShopifyConfig
  preview?: boolean
}): Promise<{
  products: Product[]
}> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch<GetAllProductsQuery>(
    getAllProductsQuery,
    { variables }
  )

  return {
    products: data.products.edges.map(({ node }) =>
      normalizeProduct(node as ShopifyProduct)
    ),
  }
}

export default getAllProducts
