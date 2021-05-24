import { GetProductBySlugQuery, Product as ShopifyProduct } from '../schema'
import { getConfig, ShopifyConfig } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'
import { Product } from '@commerce/types'

type Variables = {
  slug: string
}

const getProduct = async (options: {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<{
  product?: Product
}> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const {
    data: { productByHandle },
  } = await config.fetch<GetProductBySlugQuery>(getProductQuery, {
    variables,
  })

  return {
    ...(productByHandle && {
      product: normalizeProduct(productByHandle as ShopifyProduct),
    }),
  }
}

export default getProduct
