import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import { GetProductOperation } from '../../types/product'
import { normalizeProduct, getProductQuery } from '../../utils'
import type { ShopifyConfig, Provider } from '..'
import {
  GetProductBySlugQuery,
  Product as ShopifyProduct,
} from '../../../schema'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct(opts: {
    variables: GetProductOperation['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<GetProductOperation['data']>

  async function getProduct(
    opts: {
      variables: GetProductOperation['variables']
      config?: Partial<ShopifyConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<GetProductOperation['data']>

  async function getProduct({
    query = getProductQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: GetProductOperation['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<GetProductOperation['data']> {
    const { fetch, locale } = commerce.getConfig(cfg)

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
