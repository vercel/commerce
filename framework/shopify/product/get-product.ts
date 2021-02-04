import { GraphQLFetcherResult } from '@commerce/api'

import { getConfig, ShopifyConfig } from '../api'
import { Product } from '../schema'
import { toCommerceProduct } from '../utils/to-commerce-products'
import getProductQuery from '../utils/queries/get-product-query'

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

  const {
    data: { productByHandle: product },
  }: GraphQLFetcherResult = await config.fetch(getProductQuery, { variables })

  return {
    product: product ? toCommerceProduct(product) : null,
  }
}

export default getProduct
