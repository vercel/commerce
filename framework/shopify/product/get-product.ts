import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, ShopifyConfig } from '../api'
import { Product } from '../schema'
import getProductQuery from '../utils/queries/get-product-query'
import { normalizeProduct } from '@framework/utils/normalize'

export type ProductNode = Product

type Variables = {
  slug: string
}

type ReturnType = {
  product: any
}

const getProduct = async (options: {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(getProductQuery, {
    variables,
  })

  const { productByHandle: product } = data

  return {
    product: product ? normalizeProduct(product) : null,
  }
}

export default getProduct
