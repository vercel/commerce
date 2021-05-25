import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetAllPagesQuery, GetAllPagesQueryVariables } from '@framework/schema'
import type { ShopifyConfig, Provider } from '..'
import { GetAllPagesOperation } from '../../types/page'
import getAllPagesQuery from '../../utils/queries/get-all-pages-query'

export default function getAllPagesOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllPages<T extends GetAllPagesOperation>(opts?: {
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>(
    opts: {
      config?: Partial<ShopifyConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>({
    query = getAllPagesQuery,
    config,
  }: {
    url?: string
    config?: Partial<ShopifyConfig>
    preview?: boolean
    query?: string
  } = {}): Promise<T['data']> {
    const cfg = commerce.getConfig(config)

    const { data } = await cfg.fetch<
      GetAllPagesQuery,
      GetAllPagesQueryVariables
    >(query)

    return {
      pages: data.pages.edges,
    }
  }

  return getAllPages
}
