import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetAllProductPathsOperation } from '../../types/product'
import {
  GetAllProductPathsQuery,
  GetAllProductPathsQueryVariables,
} from '../../schema'
import type { WooCommerceConfig, Provider } from '..'
import getAllProductsQuery from '../../wp/queries/get-all-products-paths-query'

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<
    T extends GetAllProductPathsOperation
  >(opts?: {
    variables?: T['variables']
    config?: WooCommerceConfig
  }): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>(
    opts: {
      variables?: T['variables']
      config?: WooCommerceConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    query = getAllProductsQuery,
    config,
    variables,
  }: {
    query?: string
    config?: WooCommerceConfig
    variables?: T['variables']
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config)

    const { data } = await config.fetch<
      GetAllProductPathsQuery,
      GetAllProductPathsQueryVariables
    >(query, { variables })

    return {
      products: data?.products?.edges
        ? data.products.edges.map(({ node: { slug } }) => ({
            path: `/${slug}`,
          }))
        : [],
    }
  }

  return getAllProductPaths
}
