import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { GetAllProductPathsQuery } from '../../../schema'
import type { GetAllProductPathsOperation } from '@vercel/commerce/types/product'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import { BigcommerceConfig, Provider } from '..'

export const getAllProductPathsQuery = /* GraphQL */ `
  query getAllProductPaths($first: Int = 100) {
    site {
      products(first: $first) {
        edges {
          node {
            path
          }
        }
      }
    }
  }
`

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
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: BigcommerceConfig
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `query`
    const { data } = await config.fetch<
      RecursivePartial<GetAllProductPathsQuery>
    >(query, { variables })
    const products = data.site?.products?.edges

    return {
      products: filterEdges(products as RecursiveRequired<typeof products>).map(
        ({ node }) => node
      ),
    }
  }
  return getAllProductPaths
}
