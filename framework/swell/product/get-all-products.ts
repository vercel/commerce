import { getConfig, SwellConfig } from '../api'
import { normalizeProduct } from '../utils/normalize'
import { Product } from '@commerce/types'
import { SwellProduct } from '../types'

type Variables = {
  first?: number
  field?: string
}

type ReturnType = {
  products: Product[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: SwellConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)
  const { results } = await config.fetch('products', 'list', [
    {
      limit: variables.first,
    },
  ])
  const products = results.map((product: SwellProduct) =>
    normalizeProduct(product)
  )

  return {
    products,
  }
}

export default getAllProducts
