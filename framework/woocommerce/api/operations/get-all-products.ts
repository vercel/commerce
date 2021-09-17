import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetAllProductsOperation } from '../../types/product'
import {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
  Product as WooCommerceProduct,
} from '../../schema'
import type { WooCommerceConfig, Provider } from '..'
import getAllProductsQuery from '../../utils/queries/get-all-products-query'
import { normalizeProduct } from '../../utils'

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
      console.log({ data })
      return {
        products: [],
      }

      // return {
      //   products: data?.products?.edges
      //     ? data.products.edges.map(({ node }) =>
      //         normalizeProduct(node as WooCommerceProduct)
      //       )
      //     : [],
      // }
    } catch (e) {
      throw e
    }
  }

  return getAllProducts
}
