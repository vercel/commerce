import type { OperationContext } from '@commerce/api/operations'
import { GetAllPagesQuery, GetAllPagesQueryVariables } from '@framework/schema'
import type { ShopifyConfig, Provider } from '..'
import { GetAllPagesOperation } from '../../types/page'
import getAllPagesQuery from '../../utils/queries/get-all-pages-query'

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage<T extends GetAllPagesOperation>({
    query = getAllPagesQuery,
    config,
  }: {
    query?: string
    config?: ShopifyConfig
    preview?: boolean
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config)

    const { data } = await config.fetch<
      GetAllPagesQuery,
      GetAllPagesQueryVariables
    >(query)

    return {
      pages: data.pages.edges,
    }
  }

  return getPage
}
