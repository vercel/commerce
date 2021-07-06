import { OperationContext, OperationOptions } from '@commerce/api/operations'
import type { CatalogItem } from '../../schema'
import { Provider } from '../index'
import getAllProductsPathsQuery from '../../utils/queries/get-all-products-paths-query'
import { GetAllProductPathsOperation } from '@commerce/types/product'
import { ReactionCommerceConfig } from '..'

export type GetAllProductPathsResult = {
  products: Array<{ node: { path: string } }>
}

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<
    T extends GetAllProductPathsOperation
  >(opts?: {
    variables?: T['variables']
    config?: ReactionCommerceConfig
  }): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>(
    opts: {
      variables?: T['variables']
      config?: ReactionCommerceConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    query = getAllProductsPathsQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: ReactionCommerceConfig
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `query`
    const { data } = await config.fetch<CatalogItem>(query, {
      variables,
    })
    const products = data.products.items

    return {
      products: products.map((p) => ({ path: `/${p.slug}` })),
    }
  }

  return getAllProductPaths
}
