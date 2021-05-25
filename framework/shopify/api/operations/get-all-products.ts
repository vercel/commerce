import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetAllProductsOperation } from '../../types/product'
import {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
  Product as ShopifyProduct,
} from '../../schema'
import type { ShopifyConfig, Provider } from '..'
import getAllProductsQuery from '../../utils/queries/get-all-products-query'
import { normalizeProduct } from '@framework/utils'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>(opts?: {
    variables?: T['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>(
    opts: {
      variables?: T['variables']
      config?: Partial<ShopifyConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>({
    query = getAllProductsQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const cfg = commerce.getConfig(config)

    const { data } = await cfg.fetch<
      GetAllProductsQuery,
      GetAllProductsQueryVariables
    >(query, { variables })

    return {
      products: data.products.edges.map(({ node }) =>
        normalizeProduct(node as ShopifyProduct)
      ),
    }
  }

  return getAllProducts
}
