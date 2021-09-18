import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetProductOperation } from '../../types/product'
import { normalizeProduct } from '../../utils'
import getProductQuery from '../../wp/queries/get-product-query'
import type { WooCommerceConfig, Provider } from '..'
import { GetProductBySlugQuery, SimpleProduct } from '../../schema'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>(opts: {
    variables: T['variables']
    config?: Partial<WooCommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<WooCommerceConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>({
    query = getProductQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<WooCommerceConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(cfg)

    const {
      data: { product },
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
      ...(product && {
        product: normalizeProduct(product as SimpleProduct),
      }),
    }
  }

  return getProduct
}
