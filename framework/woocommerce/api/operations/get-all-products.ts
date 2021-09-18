import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetAllProductsOperation } from '../../types/product'
import {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
  SimpleProduct,
} from '../../schema'
import type { WooCommerceConfig, Provider } from '..'
import getAllProductsQuery from '../../wp/queries/get-all-products-query'
import { normalizeProduct } from '../../utils'

import type { Product } from '../../types/product'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>(opts?: {
    variables?: T['variables']
    config?: Partial<WooCommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>(
    opts: {
      variables?: T['variables']
      config?: Partial<WooCommerceConfig>
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
    config?: Partial<WooCommerceConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(config)
    // console.log({ a: 'reza', query, variables, config, fetch, locale })
    try {
      const { data } = await fetch<
        GetAllProductsQuery,
        GetAllProductsQueryVariables
      >(
        query,
        { variables },
        {
          ...(locale && {
            headers: {
              'Accept-Language': locale,
            },
          }),
        }
      )

      let products: Product[] = []

      if (data?.products?.edges) {
        data?.products?.edges?.map(({ node }) =>
          products.push(normalizeProduct(node as SimpleProduct))
        )
      }

      return {
        products,
      }
    } catch (e) {
      throw e
    }
  }

  return getAllProducts
}
