import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, SwellConfig } from '../api'
import { ProductEdge } from '../schema'
import { getAllProductsQuery } from '../utils/queries'
import { normalizeProduct } from '../utils/normalize'
import { Product } from '@commerce/types'

type Variables = {
  first?: number
  field?: string
}

type ReturnType = {
  products: Product[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: SwellConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)
  const { results } = await config.fetchSwell('products', 'list', [
    {
      limit: variables.first,
    },
  ])
  const products = results.map((product) => normalizeProduct(product)) ?? []
  return {
    products,
  }
}

export default getAllProducts
