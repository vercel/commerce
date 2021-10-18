import { Product } from '@commerce/types/product'
import { Provider, VendureConfig } from '../'
import { GetAllProductsQuery } from '../../schema'
import { normalizeSearchResult } from '../../utils/normalize'
import { getAllProductsQuery } from '../../utils/queries/get-all-products-query'
import { OperationContext } from '@commerce/api/operations'

export type ProductVariables = { first?: number, facetValueIds?: string[], collectionSlug?:string, groupByProduct?:boolean }

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts(opts?: {
    variables?: ProductVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ products: Product[], totalItems: number }>

  async function getAllProducts({
    query = getAllProductsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: ProductVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[], totalItems: number }> {
    const config = commerce.getConfig(cfg)
    const variables = {
      input: {
        take: vars.first,
        facetValueIds: vars.facetValueIds,
        collectionSlug : vars.collectionSlug,
        groupByProduct: vars.groupByProduct??true,
      },
    }
    const { data } = await config.fetch<GetAllProductsQuery>(query, {
      variables,
    })
    return {
      products: data.search.items.map((item) => normalizeSearchResult(item)),
      totalItems: data.search.totalItems as number,
    }
  }

  return getAllProducts
}
