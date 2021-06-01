import { Product } from '@commerce/types'
import { QueryRoot } from '../schema'
import { getConfig, ShopifyConfig } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'

export type GetProductInput = {
  slug: string
}

export type GetProductResult = {
  product?: Product
}

const getProduct = async ({
  variables,
  config,
}: {
  variables: GetProductInput
  config?: ShopifyConfig
  preview?: boolean
}): Promise<GetProductResult> => {
  const { fetch, locale } = getConfig(config)

  const {
    data: { productByHandle },
  } = await fetch<QueryRoot>(
    getProductQuery,
    {
      variables,
    },
    {
      ...(locale && {
        headers: {
          'Accept-Language': locale,
        },
      }),
    }
  )

  return productByHandle ? { product: normalizeProduct(productByHandle) } : {}
}

export default getProduct
