import { GraphQLFetcherResult } from '@commerce/api'

import { getConfig, ShopifyConfig } from '../api'
import { Product } from '../schema'
import getProductQuery from '../utils/queries/get-product-query'
import { normalizeProduct } from '@framework/lib/normalize'

export type ProductNode = Product

type Variables = {
  slug: string
}

type Options = {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}

type ReturnType = {
  product: any
}

const getProduct = async (options: Options): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(getProductQuery, {
    variables,
  })

  const product = data?.productByHandle?.product

  return {
    product: product ? normalizeProduct(product) : null,
  }
}

export default getProduct
