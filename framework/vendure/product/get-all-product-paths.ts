import type {
  GetAllProductPathsQuery,
  GetAllProductPathsQueryVariables,
} from '../schema'
import { getConfig, VendureConfig } from '../api'
import { getAllProductPathsQuery } from '../lib/queries/get-all-product-paths-query'

export type GetAllProductPathsResult = {
  products: Array<{ node: { path: string } }>
}

async function getAllProductPaths(opts?: {
  variables?: GetAllProductPathsQueryVariables
  config?: VendureConfig
}): Promise<GetAllProductPathsResult>

async function getAllProductPaths<
  T extends { products: any[] },
  V = any
>(opts: {
  query: string
  variables?: V
  config?: VendureConfig
}): Promise<GetAllProductPathsResult>

async function getAllProductPaths({
  query = getAllProductPathsQuery,
  variables,
  config,
}: {
  query?: string
  variables?: GetAllProductPathsQueryVariables
  config?: VendureConfig
} = {}): Promise<GetAllProductPathsResult> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const { data } = await config.fetch<GetAllProductPathsQuery>(query, {
    variables,
  })
  const products = data.products.items

  return {
    products: products.map((p) => ({ node: { path: `/${p.slug}` } })),
  }
}

export default getAllProductPaths
