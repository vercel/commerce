import type {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from 'lib/bigcommerce/schema'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import { productInfoFragment } from '../fragments/product'
import { BigcommerceConfig, getConfig, Images, ProductImageVariables } from '..'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $entityIds: [Int!]
    $first: Int = 10
    $imgSmallWidth: Int = 320
    $imgSmallHeight: Int
    $imgMediumWidth: Int = 640
    $imgMediumHeight: Int
    $imgLargeWidth: Int = 960
    $imgLargeHeight: Int
    $imgXLWidth: Int = 1280
    $imgXLHeight: Int
  ) {
    site {
      products(first: $first, entityIds: $entityIds) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...productInfo
          }
        }
      }
    }
  }

  ${productInfoFragment}
`

export type Product = NonNullable<
  NonNullable<GetAllProductsQuery['site']['products']['edges']>[0]
>

export type Products = Product[]

export type GetAllProductsResult<
  T extends { products: any[] } = { products: Products }
> = T

export type ProductVariables = Images &
  Omit<GetAllProductsQueryVariables, keyof ProductImageVariables>

async function getAllProducts(opts?: {
  variables?: ProductVariables
  config?: BigcommerceConfig
}): Promise<GetAllProductsResult>

async function getAllProducts<T extends { products: any[] }, V = any>(opts: {
  query: string
  variables?: V
  config?: BigcommerceConfig
}): Promise<GetAllProductsResult<T>>

async function getAllProducts({
  query = getAllProductsQuery,
  variables: vars,
  config,
}: {
  query?: string
  variables?: ProductVariables
  config?: BigcommerceConfig
} = {}): Promise<GetAllProductsResult> {
  config = getConfig(config)
  const variables: GetAllProductsQueryVariables = {
    ...config.imageVariables,
    ...vars,
  }
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const data = await config.fetch<RecursivePartial<GetAllProductsQuery>>(
    query,
    { variables }
  )
  const products = data.site?.products?.edges

  return {
    products: filterEdges(products as RecursiveRequired<typeof products>),
  }
}

export default getAllProducts
