import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, ShopifyConfig } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'

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
  const { productByHandle } = data

  return {
    product: productByHandle ? normalizeProduct(productByHandle) : null,
  }
}

export default getProduct
