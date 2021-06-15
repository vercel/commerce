import { OperationContext, OperationOptions } from '@commerce/api/operations'
import type { GetAllProductPathsQuery } from '../../schema'
import { Provider } from '../index'
import { getAllProductPathsQuery } from '../../utils/queries/get-all-product-paths-query'
import { GetAllProductPathsOperation } from '@commerce/types/product'
import { BigcommerceConfig } from '../../../bigcommerce/api'

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
    config?: BigcommerceConfig
  }): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>(
    opts: {
      variables?: T['variables']
      config?: BigcommerceConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    query = getAllProductPathsQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: BigcommerceConfig
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `query`
    const { data } = await config.fetch<GetAllProductPathsQuery>(query, {
      variables,
    })
    const products = data.products.items

    return {
      products: products.map((p) => ({ path: `/${p.slug}` })),
    }
  }

  return getAllProductPaths
}
