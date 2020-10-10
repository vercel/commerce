import type { GetAllProductPathsQuery } from 'lib/bigcommerce/schema'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import { BigcommerceConfig, getConfig } from '..'

export const getAllProductPathsQuery = /* GraphQL */ `
  query getAllProductPaths {
    site {
      products {
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

export type GetAllProductPathsResult<
  T extends { products: any[] } = { products: ProductPaths }
> = T

async function getAllProductPaths(opts?: {
  config?: BigcommerceConfig
}): Promise<GetAllProductPathsResult>

async function getAllProductPaths<
  T extends { products: any[] },
  V = any
>(opts: {
  query: string
  config?: BigcommerceConfig
}): Promise<GetAllProductPathsResult<T>>

async function getAllProductPaths({
  query = getAllProductPathsQuery,
  config,
}: {
  query?: string
  config?: BigcommerceConfig
} = {}): Promise<GetAllProductPathsResult> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const data = await config.fetch<RecursivePartial<GetAllProductPathsQuery>>(
    query
  )
  const products = data.site?.products?.edges

  return {
    products: filterEdges(products as RecursiveRequired<typeof products>),
  }
}

export default getAllProductPaths
