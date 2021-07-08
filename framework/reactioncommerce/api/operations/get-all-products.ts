import { Product } from '@commerce/types/product'
import { OperationContext } from '@commerce/api/operations'
import { normalizeProduct } from '@framework/utils'
import catalogItemsQuery from '../../utils/queries/catalog-items-query'
import { CatalogItemConnection } from '../../schema'
import { Provider, ReactionCommerceConfig } from '..'

export type ProductVariables = {
  first?: number
  shopIds?: string[]
}

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts(opts?: {
    variables?: ProductVariables
    config?: Partial<ReactionCommerceConfig>
    preview?: boolean
  }): Promise<{ products: Product[] }>

  async function getAllProducts({
    query = catalogItemsQuery,
    variables: { ...vars } = { first: 250 },
    config: cfg,
  }: {
    query?: string
    variables?: ProductVariables
    config?: Partial<ReactionCommerceConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    const config = commerce.getConfig(cfg)
    const { data } = await config.fetch<CatalogItemConnection>(query, {
      variables: {
        ...vars,
        shopIds: [config.shopId],
      },
    })

    return {
      products:
        data.catalogItems?.edges?.map((item) => normalizeProduct(item?.node)) ||
        [],
    }
  }

  return getAllProducts
}
