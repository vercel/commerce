import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, ReactionCommerceConfig } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'

type Variables = {
  slug: string
}

type ReturnType = {
  product: any
}

const getProduct = async (options: {
  variables: Variables
  config: ReactionCommerceConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(getProductQuery, {
    variables,
  })

  const { catalogItemProduct: product } = data

  return {
    product: product ? normalizeProduct(product) : null,
  }
}

export default getProduct
