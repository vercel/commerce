import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, ReactionCommerceConfig } from '../api'
import { CatalogItemEdge, CatalogItemProduct } from '../schema'
import { catalogItemsQuery, normalizeProduct } from '../utils'
import { Product } from '@commerce/types'

type Variables = {
  first?: number
  shopIds?: string[]
}

type ReturnType = {
  products: Product[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: ReactionCommerceConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(catalogItemsQuery, {
    variables: {
      ...variables,
      shopIds: [config.shopId],
    },
  })

  const catalogItems =
    data.catalogItems?.edges?.map(({ node: itemProduct }: CatalogItemEdge) =>
      normalizeProduct(itemProduct as CatalogItemProduct)
    ) ?? []

  return {
    products: catalogItems,
  }
}

export default getAllProducts
