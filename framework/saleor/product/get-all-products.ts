import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, SaleorConfig } from '../api'
import { Product as SaleorProduct } from '../schema'
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
  config?: SaleorConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 100 } } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(
    getAllProductsQuery,
    { variables }
  )

  const products =
    data.products?.edges?.map(({ node: p }: SaleorProduct) =>
      normalizeProduct(p)
    ) ?? []

  return {
    products,
  }
}

export default getAllProducts
