import { GraphQLFetcherResult } from '@commerce/api'
import toCommerceProducts from '../utils/to-commerce-products'
import { getConfig, ShopifyConfig } from '../api'
import { Product } from '../schema'
import { getAllProductsQuery } from '../utils/queries'

export type ProductNode = Product

type Variables = {
  first?: number
  field?: string
}

type ReturnType = {
  products: any[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(
    getAllProductsQuery,
    { variables }
  )

  const shopifyProducts = data.products?.edges
  const products = toCommerceProducts(shopifyProducts)

  return {
    products,
  }
}

export default getAllProducts
