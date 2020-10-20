import type {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from '@lib/bigcommerce/schema'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import { productConnectionFragment } from '../fragments/product'
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
    $products: Boolean = false
    $featuredProducts: Boolean = false
    $bestSellingProducts: Boolean = false
    $newestProducts: Boolean = false
  ) {
    site {
      products(first: $first, entityIds: $entityIds) @include(if: $products) {
        ...productConnnection
      }
      featuredProducts(first: $first) @include(if: $featuredProducts) {
        ...productConnnection
      }
      bestSellingProducts(first: $first) @include(if: $bestSellingProducts) {
        ...productConnnection
      }
      newestProducts(first: $first) @include(if: $newestProducts) {
        ...productConnnection
      }
    }
  }

  ${productConnectionFragment}
`

export type ProductEdge = NonNullable<
  NonNullable<GetAllProductsQuery['site']['products']['edges']>[0]
>

export type ProductNode = ProductEdge['node']

export type GetAllProductsResult<
  T extends Record<keyof GetAllProductsResult, any[]> = {
    products: ProductEdge[]
  }
> = T

const FIELDS = [
  'products',
  'featuredProducts',
  'bestSellingProducts',
  'newestProducts',
]

export type ProductTypes =
  | 'products'
  | 'featuredProducts'
  | 'bestSellingProducts'
  | 'newestProducts'

export type ProductVariables = { field?: ProductTypes } & Images &
  Omit<GetAllProductsQueryVariables, ProductTypes | keyof ProductImageVariables>

async function getAllProducts(opts?: {
  variables?: ProductVariables
  config?: BigcommerceConfig
}): Promise<GetAllProductsResult>

async function getAllProducts<
  T extends Record<keyof GetAllProductsResult, any[]>,
  V = any
>(opts: {
  query: string
  variables?: V
  config?: BigcommerceConfig
}): Promise<GetAllProductsResult<T>>

async function getAllProducts({
  query = getAllProductsQuery,
  variables: { field = 'products', ...vars } = {},
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

  if (!FIELDS.includes(field)) {
    throw new Error(
      `The field variable has to match one of ${FIELDS.join(', ')}`
    )
  }

  variables[field] = true

  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const data = await config.fetch<RecursivePartial<GetAllProductsQuery>>(
    query,
    { variables }
  )
  const products = data.site?.[field]?.edges

  return {
    products: filterEdges(products as RecursiveRequired<typeof products>),
  }
}

export default getAllProducts
