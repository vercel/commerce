import type {
  GetAllProductPathsQuery,
  GetAllProductPathsQueryVariables,
} from '../schema'
import type { RecursivePartial, RecursiveRequired } from '../api/utils/types'
import filterEdges from '../api/utils/filter-edges'
import { BigcommerceConfig, getConfig } from '../api'

export const getAllProductPathsQuery = /* GraphQL */ `
  query getAllProductPaths($first: Int = 100) {
    site {
      products(first: $first) {
        edges {
          node {
            path
          }
        }
      }
    }
  }
`

export type ProductPath = NonNullable<
  NonNullable<GetAllProductPathsQuery['site']['products']['edges']>[0]
>

export type ProductPaths = ProductPath[]

export type { GetAllProductPathsQueryVariables }

export type GetAllProductPathsResult<
  T extends { products: any[] } = { products: ProductPaths }
> = T

async function getAllProductPaths(opts?: {
  variables?: GetAllProductPathsQueryVariables
  config?: BigcommerceConfig
}): Promise<GetAllProductPathsResult>

async function getAllProductPaths<
  T extends { products: any[] },
  V = any
>(opts: {
  query: string
  variables?: V
  config?: BigcommerceConfig
}): Promise<GetAllProductPathsResult<T>>

async function getAllProductPaths({
  query = getAllProductPathsQuery,
  variables,
  config,
}: {
  query?: string
  variables?: GetAllProductPathsQueryVariables
  config?: BigcommerceConfig
} = {}): Promise<GetAllProductPathsResult> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const { data } = await config.fetch<
    RecursivePartial<GetAllProductPathsQuery>
  >(query, { variables })
  const products = data.site?.products?.edges

  return {
    products: filterEdges(products as RecursiveRequired<typeof products>),
  }
}

export default getAllProductPaths
