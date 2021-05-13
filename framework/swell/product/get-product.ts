import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, SwellConfig } from '../api'
import { normalizeProduct } from '../utils'

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

  const product = await config.fetch('products', 'get', [variables.slug])

  if (product && product.variants) {
    product.variants = product.variants?.results
  }

  return {
    product: product ? normalizeProduct(product) : null,
  }
}

export default getProduct
