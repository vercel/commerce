import type { OperationContext } from '@vercel/commerce/api/operations'
import type { GetAllProductsOperation } from '../../types/product'
import {
  CatalogItemProduct,
  CatalogItemsQuery,
  CatalogItemsQueryVariables,
} from '../../../schema'
import catalogItemsQuery from '../queries/get-all-products-query'
import type { OpenCommerceConfig, Provider } from '..'
import { normalizeProduct } from '../../utils/normalize'
import { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>(opts?: {
    variables?: CatalogItemsQueryVariables
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
    const { fetch, locale, shopId } = commerce.getConfig(config)

    const { data } = await fetch<
      RecursivePartial<CatalogItemsQuery>,
      CatalogItemsQueryVariables
    >(
      query,
      { variables: { ...variables, shopIds: [shopId] } },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )

    const edges = data.catalogItems?.edges
    return {
      products: filterEdges(edges as RecursiveRequired<typeof edges>).map(
        (item) =>
          normalizeProduct(
            item?.node ? (item.node as CatalogItemProduct) : null
          )
      ),
    }
  }

  return getAllProducts
}
