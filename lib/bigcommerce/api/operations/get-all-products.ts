import type {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from 'lib/bigcommerce/schema'
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
    $featuredProducts: Boolean = false
    $featuredProducts__first: Int = 10
    $bestSellingProducts: Boolean = false
    $bestSellingProducts__first: Int = 10
    $newestProducts: Boolean = false
    $newestProducts__first: Int = 10
  ) {
    site {
      products(first: $first, entityIds: $entityIds) {
        ...productConnnection
      }
      featuredProducts(first: $featuredProducts__first)
        @include(if: $featuredProducts) {
        ...productConnnection
      }
      bestSellingProducts(first: $bestSellingProducts__first)
        @include(if: $bestSellingProducts) {
        ...productConnnection
      }
      newestProducts(first: $newestProducts__first)
        @include(if: $newestProducts) {
        ...productConnnection
      }
    }
  }

  ${productConnectionFragment}
`

export type Product = NonNullable<
  NonNullable<GetAllProductsQuery['site']['products']['edges']>[0]
>

export type Products = Product[]

export type GetAllProductsResult<
  T extends Record<keyof GetAllProductsResult, any[]> = {
    products: Products
    featuredProducts: Products
    bestSellingProducts: Products
    newestProducts: Products
  }
> = T

export type ProductVariables = {
  featured?: boolean | { first?: number }
  bestSelling?: boolean | { first?: number }
  newest?: boolean | { first?: number }
} & Images &
  Omit<GetAllProductsQueryVariables, keyof ProductImageVariables>

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
  variables: { featured, bestSelling, newest, ...vars } = {},
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

  if (bestSelling) {
    variables.bestSellingProducts = true
    if (typeof bestSelling === 'object' && bestSelling.first) {
      variables.bestSellingProducts__first = bestSelling.first
    }
  }
  if (featured) {
    variables.featuredProducts = true
    if (typeof featured === 'object' && featured.first) {
      variables.featuredProducts__first = featured.first
    }
  }
  if (newest) {
    variables.newestProducts = true
    if (typeof newest === 'object' && newest.first) {
      variables.newestProducts__first = newest.first
    }
  }

  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const data = await config.fetch<RecursivePartial<GetAllProductsQuery>>(
    query,
    { variables }
  )
  const products = data.site?.products?.edges

  type P = RecursiveRequired<typeof products>

  return {
    products: filterEdges(products as P),
    featuredProducts: filterEdges(data.site?.featuredProducts?.edges as P),
    bestSellingProducts: filterEdges(
      data.site?.bestSellingProducts?.edges as P
    ),
    newestProducts: filterEdges(data.site?.newestProducts?.edges as P),
  }
}

export default getAllProducts
