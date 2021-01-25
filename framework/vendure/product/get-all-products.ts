import { getConfig, VendureConfig } from '../api'
import { searchResultFragment } from '@framework/api/fragments/search-result'
import { GetAllProductsQuery } from '@framework/schema'
import { normalizeSearchResult } from '@framework/lib/normalize'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        ...SearchResult
      }
    }
  }
  ${searchResultFragment}
`

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
