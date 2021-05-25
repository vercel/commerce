import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { ShopifyConfig, Provider } from '..'
import { GetPageQuery, GetPageQueryVariables, Page } from '../../schema'
import { GetPageOperation } from '../../types/page'
import getPageQuery from '../../utils/queries/get-page-query'

export default function getPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage<T extends GetPageOperation>(opts: {
    variables: T['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getPage<T extends GetPageOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<ShopifyConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getPage<T extends GetPageOperation>({
    query = getPageQuery,
    variables,
    config,
    preview,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const cfg = commerce.getConfig(config)

    const {
      data: { node: page },
    } = await cfg.fetch<GetPageQuery, GetPageQueryVariables>(query)

    return page ? { page } : {}
  }

  return getPage
}
