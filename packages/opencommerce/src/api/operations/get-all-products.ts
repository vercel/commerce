import type { OperationContext } from '@vercel/commerce/api/operations'
import type { GetAllProductsOperation } from '../../types/product'
import {
  CatalogItemProduct,
  CatalogItemsQuery,
  CatalogItemsQueryVariables,
  PrimaryShopQuery,
} from '../../../schema'
import catalogItemsQuery from '../queries/get-all-products-query'
import type { OpenCommerceConfig, Provider } from '..'
import { normalizeProduct } from '../../utils/normalize'
import { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import getPrimaryShopQuery from '../queries/get-primary-shop-query'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>(opts?: {
    variables?: Omit<CatalogItemsQueryVariables, 'shopIds'>
    config?: Partial<OpenCommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>({
    query = catalogItemsQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: Omit<CatalogItemsQueryVariables, 'shopIds'>
    config?: Partial<OpenCommerceConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(config)
    const {
      data: { primaryShop },
    } = await fetch<PrimaryShopQuery>(getPrimaryShopQuery)

    if (!primaryShop?._id) {
      return {
       products: []
      }
    }

    const { data } = await fetch<
      RecursivePartial<CatalogItemsQuery>,
      CatalogItemsQueryVariables
    >(
      query,
      { variables: { ...variables, shopIds: [primaryShop._id] } },
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
