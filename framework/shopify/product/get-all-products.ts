 { GraphQLFetcherResult } '@commerce/api'
 { getConfig, ShopifyConfig } '../api'
 { ProductEdge } '../schema'
 { getAllProductsQuery } '../utils/queries'
 { normalizeProduct } '../utils/normalize'
 { Product } '@commerce/types'

Variables = {
  first?: number
  field?: string
}

ReturnType = {
  products : Product[]
}

 getAllProducts = (options: {
  variables?: Variables
  config?: ShopifyConfig
  preview?: boolean
}): PromiseReturnType => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

   { data }: GraphQLFetcherResult = config.fetch(
    getAllProductsQuery,
    { variables }
  )

   products = data.products?.edges?.map(({ node: p }: ProductEdge) =>
    normalizeProduct(p)
  )

   {
    products,
  }
}

export default getAllProducts
