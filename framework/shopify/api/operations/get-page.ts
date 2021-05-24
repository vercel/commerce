import type { OperationContext } from '@commerce/api/operations'
import type { ShopifyConfig, Provider } from '..'
import { GetPageQuery, GetPageQueryVariables, Page } from '../../schema'
import { GetPageOperation } from '../../types/page'

import getPageQuery from '../../utils/queries/get-page-query'

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage<T extends GetPageOperation>({
    query = getPageQuery,
    config,
  }: {
    query?: string
    config?: ShopifyConfig
    preview?: boolean
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config)

    const { data } = await config.fetch<GetPageQuery, GetPageQueryVariables>(
      query
    )

    if (data.node) {
      return {}
    }

    return {}
  }

  return getPage
}
