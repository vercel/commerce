import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { GetAllProductsOperation } from '../../types/product'
import {
  CatalogItemProduct,
  CatalogItemsQuery,
  CatalogItemsQueryVariables,
  Product as OpenCommerceProduct,
} from '../../../schema'
import catalogItemsQuery from '../queries/product'
import type { OpenCommerceConfig, Provider } from '..'
import { normalizeProduct } from '../../utils/normalize'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>(opts?: {
    variables?: T['variables']
    config?: Partial<OpenCommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>({
    query = catalogItemsQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: CatalogItemsQueryVariables
    config?: Partial<OpenCommerceConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(config)

    const { data } = await fetch<CatalogItemsQuery, CatalogItemsQueryVariables>(
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
        data.catalogItems?.edges?.map((item) =>
          normalizeProduct(
            item?.node ? (item.node as CatalogItemProduct) : null
          )
        ) ?? [],
    }
  }

  return getAllProducts
}
