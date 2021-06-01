import { GraphQLFetcherResult } from '@commerce/api'
import { Product } from '@commerce/types'

import { getConfig, SaleorConfig } from '../api'
import { ProductCountableEdge } from '../schema'
import { normalizeProduct } from '../utils/normalize'

import * as query from '../utils/queries'

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
  featured?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 100 }, featured } = options ?? {}
  config = getConfig(config)

  if (featured) {
    const { data }: GraphQLFetcherResult = await config.fetch(query.CollectionOne, {
      variables: { ...variables, categoryId: 'Q29sbGVjdGlvbjoxOQ==' },
    })

    debugger

    const products = data.collection.products?.edges?.map(({ node: p }: ProductCountableEdge) => normalizeProduct(p)) ?? []

    return {
      products,
    }

  } else {
    const { data }: GraphQLFetcherResult = await config.fetch(query.ProductMany, {
      variables,
    })

    const products = data.products?.edges?.map(({ node: p }: ProductCountableEdge) => normalizeProduct(p)) ?? []

    return {
      products,
    }
  }
}

export default getAllProducts
