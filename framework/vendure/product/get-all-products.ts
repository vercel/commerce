import { Product } from '@commerce/types'
import { getConfig, VendureConfig } from '../api'
import { GetAllProductsQuery } from '../schema'
import { normalizeSearchResult } from '../lib/normalize'
import { getAllProductsQuery } from '../lib/queries/get-all-products-query'

export type ProductVariables = { first?: number }

async function getAllProducts(opts?: {
  variables?: ProductVariables
  config?: VendureConfig
  preview?: boolean
}): Promise<{ products: Product[] }>

async function getAllProducts({
  query = getAllProductsQuery,
  variables: { ...vars } = {},
  config,
}: {
  query?: string
  variables?: ProductVariables
  config?: VendureConfig
  preview?: boolean
} = {}): Promise<{ products: Product[] | any[] }> {
  config = getConfig(config)
  const variables = {
    input: {
      take: vars.first,
      groupByProduct: true,
    },
  }
  const { data } = await config.fetch<GetAllProductsQuery>(query, { variables })

  return {
    products: data.search.items.map((item) => normalizeSearchResult(item)),
  }
}

export default getAllProducts
