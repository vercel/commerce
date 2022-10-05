import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from '../../../schema'
import type { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import setProductLocaleMeta from '../utils/set-product-locale-meta'
import { productConnectionFragment } from '../fragments/product'
import { BigcommerceConfig, Provider } from '..'
import { normalizeProduct } from '../../lib/normalize'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $hasLocale: Boolean = false
    $locale: String = "null"
    $entityIds: [Int!]
    $first: Int = 10
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

function getProductsType(
  relevance?: GetAllProductsOperation['variables']['relevance']
) {
  switch (relevance) {
    case 'featured':
      return 'featuredProducts'
    case 'best_selling':
      return 'bestSellingProducts'
    case 'newest':
      return 'newestProducts'
    default:
      return 'products'
  }
}

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>(opts?: {
    variables?: T['variables']
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>(
    opts: {
      variables?: T['variables']
      config?: Partial<BigcommerceConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>({
    query = getAllProductsQuery,
    variables: vars = {},
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    const { locale } = config
    const field = getProductsType(vars.relevance)
    const variables: GetAllProductsQueryVariables = {
      locale,
      hasLocale: !!locale,
    }

    variables[field] = true

    if (vars.first) variables.first = vars.first
    if (vars.ids) variables.entityIds = vars.ids.map((id) => Number(id))

    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `query`
    const { data } = await config.fetch<RecursivePartial<GetAllProductsQuery>>(
      query,
      { variables }
    )
    const edges = data.site?.[field]?.edges
    const products = filterEdges(edges as RecursiveRequired<typeof edges>)

    if (locale && config.applyLocale) {
      products.forEach((product: RecursivePartial<ProductEdge>) => {
        if (product.node) setProductLocaleMeta(product.node)
      })
    }

    return {
      products: products.map(({ node }) => normalizeProduct(node as any)),
    }
  }

  return getAllProducts
}
