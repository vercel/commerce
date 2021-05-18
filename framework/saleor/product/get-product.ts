import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, SaleorConfig } from '../api'
import { normalizeProduct } from '../utils'
import * as query from '../utils/queries'

type Variables = {
  slug: string
}

type ReturnType = {
  product: any
}

const getProduct = async (options: {
  variables: Variables
  config: SaleorConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(query.ProductOneBySlug, { variables })

  return {
    product: data?.product ? normalizeProduct(data.product) : null,
  }
}

export default getProduct
