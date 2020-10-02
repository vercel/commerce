import type {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from 'lib/bigcommerce/schema'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import { productInfoFragment } from '../fragments/product'
import { BigcommerceConfig, getConfig, Images, ProductImageVariables } from '..'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
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
      products(first: $first) {
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

export interface GetAllProductsResult<T> {
  products: T extends GetAllProductsQuery
    ? NonNullable<T['site']['products']['edges']>
    : unknown
}

export type ProductVariables = Images &
  Omit<GetAllProductsQueryVariables, keyof ProductImageVariables>

async function getAllProducts(opts?: {
  variables?: ProductVariables
  config?: BigcommerceConfig
}): Promise<GetAllProductsResult<GetAllProductsQuery>>

async function getAllProducts<T, V = any>(opts: {
  query: string
  variables?: V
  config?: BigcommerceConfig
}): Promise<GetAllProductsResult<T>>

async function getAllProducts({
  query = getAllProductsQuery,
  variables: vars,
  config = getConfig(),
}: {
  query?: string
  variables?: ProductVariables
  config?: BigcommerceConfig
} = {}): Promise<GetAllProductsResult<GetAllProductsQuery>> {
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
    products: (products as RecursiveRequired<typeof products>) ?? [],
  }
}

export default getAllProducts
