import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type {
  CatalogItemsQuery,
  CatalogItemsQueryVariables,
  CatalogItemProduct,
  PrimaryShopQuery,
} from '../../../schema'
import type { GetAllProductPathsOperation } from '../../types/product'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import { OpenCommerceConfig, Provider } from '..'
import getAllProductPathsQuery from '../queries/get-all-product-paths-query'
import getPrimaryShopQuery from '../queries/get-primary-shop-query'

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<
    T extends GetAllProductPathsOperation
  >(opts?: {
    variables?: CatalogItemsQueryVariables
    config?: OpenCommerceConfig
  }): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>(
    opts: {
      variables?: CatalogItemsQueryVariables
      config?: OpenCommerceConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    query = getAllProductPathsQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: CatalogItemsQueryVariables
    config?: OpenCommerceConfig
  } = {}): Promise<T['data']> {
    const { fetch } = commerce.getConfig(config)

    const {
      data: { primaryShop },
    } = await fetch<PrimaryShopQuery>(getPrimaryShopQuery)

    if (!primaryShop?._id) {
      return {
        products: [],
      }
    }

    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `query`
    const { data } = await fetch<
      RecursivePartial<CatalogItemsQuery>,
      CatalogItemsQueryVariables
    >(query, {
      variables: { ...variables, shopIds: [primaryShop._id] },
    })

    const products = data.catalogItems?.edges

    return {
      products: filterEdges(products as RecursiveRequired<typeof products>).map(
        ({ node }) => ({
          path: `/${(node as CatalogItemProduct).product!.slug}`,
        })
      ),
    }
  }
  return getAllProductPaths
}
