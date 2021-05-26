import type { OperationContext } from '@commerce/api/operations'
import { GetProductOperation } from '../../types/product'
import { normalizeProduct, getProductQuery } from '../../utils'
import type { ShopifyConfig, Provider } from '..'
import {
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
  Product as ShopifyProduct,
} from '../../schema'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    query = getProductQuery,
    config,
    variables,
  }: {
    query?: string
    config?: ShopifyConfig
    variables?: GetProductBySlugQueryVariables
  } = {}): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(config)

    const {
      data: { productByHandle },
    } = await fetch<GetProductBySlugQuery>(
      query,
      {
        variables,
      },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )

    return {
      ...(productByHandle && {
        product: normalizeProduct(productByHandle as ShopifyProduct),
      }),
    }
  }

  return getProduct
}
