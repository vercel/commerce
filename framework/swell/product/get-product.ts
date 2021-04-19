import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, SwellConfig } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'

type Variables = {
  slug: string
}

type ReturnType = {
  product: any
}

const getProduct = async (options: {
  variables: Variables
  config: SwellConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const product = await config.fetchSwell('products', 'get', [variables.slug])
  if (product.variants) {
    product.variants = product.variants?.results
  }
  // console.log('product', product)
  return {
    product: normalizeProduct(product),
  }
}

export default getProduct
