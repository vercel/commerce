import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import { GetProductOperation } from '../../types/product'
import { normalizeProduct } from '../../utils/normalize'
import type { OpenCommerceConfig, Provider } from '..'
import {
  CatalogItemProduct,
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
} from '../../../schema'
import getProductQuery from '../queries/get-product-query'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>(opts: {
    variables: GetProductBySlugQueryVariables
    config?: Partial<OpenCommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>(
    opts: {
      variables: GetProductBySlugQueryVariables
      config?: Partial<OpenCommerceConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>({
    query = getProductQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: GetProductBySlugQueryVariables
    config?: Partial<OpenCommerceConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(cfg)

    const {
      data: { catalogItemProduct },
    } = await fetch<GetProductBySlugQuery, GetProductBySlugQueryVariables>(
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
      ...(catalogItemProduct && {
        product: normalizeProduct(catalogItemProduct as CatalogItemProduct),
      }),
    }
  }

  return getProduct
}
