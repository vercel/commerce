import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, ShopifyConfig } from '../api'
import { Product, ProductEdge } from '../schema'
import { getAllProductsQuery } from '../utils/queries'
import { normalizeProduct } from '@framework/utils/normalize'

export type ProductNode = Product

type Variables = {
  first?: number
  field?: string
}

type ReturnType = {
  products: any[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(
    getAllProductsQuery,
    { variables }
  )

  const products = data.products?.edges?.map(({ node: p }: ProductEdge) =>
    normalizeProduct(p)
  )

  return {
    products,
  }
}

export default getAllProducts
