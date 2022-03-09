import { Product } from '@vercel/commerce/types/product'
import { Provider, VendureConfig } from '../'
import { GetAllProductsQuery } from '../../../schema'
import { normalizeSearchResult } from '../../utils/normalize'
import { getAllProductsQuery } from '../../utils/queries/get-all-products-query'
import { OperationContext } from '@vercel/commerce/api/operations'

export type ProductVariables = { first?: number }

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts(opts?: {
    variables?: ProductVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ products: Product[] }>

  async function getAllProducts({
    query = getAllProductsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: ProductVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    const config = commerce.getConfig(cfg)
    const variables = {
      input: {
        take: vars.first,
        groupByProduct: true,
      },
    }
    const { data } = await config.fetch<GetAllProductsQuery>(query, {
      variables,
    })

    return {
      products: data.search.items.map((item) => normalizeSearchResult(item)),
    }
  }

  return getAllProducts
}
