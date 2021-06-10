import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetRelatedProductsOperation } from '../../types/product'
import {
  GetRelatedProductsQuery,
  GetRelatedProductsQueryVariables,
  Product as ShopifyProduct,
} from '../../schema'
import type { ShopifyConfig, Provider } from '..'
import getRelatedProductsQuery from '../../utils/queries/get-related-products-query'
import { normalizeProduct } from '../../utils'

export default function getRelatedProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getRelatedProductsOperation<
    T extends GetRelatedProductsOperation
  >(opts: {
    variables: T['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getRelatedProductsOperation<
    T extends GetRelatedProductsOperation
  >(
    opts: {
      variables: T['variables']
      config?: Partial<ShopifyConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getRelatedProductsOperation<
    T extends GetRelatedProductsOperation
  >({
    query = getRelatedProductsQuery,
    variables,
    config,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(config)

    const { data } = await fetch<
      GetRelatedProductsQuery,
      GetRelatedProductsQueryVariables
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

    return {
      products:
        data.productRecommendations
          ?.sort(() => 0.5 - Math.random())
          .splice(0, variables?.first || 4)
          .map((product) => normalizeProduct(product as ShopifyProduct)) ?? [],
    }
  }

  return getRelatedProductsOperation
}
