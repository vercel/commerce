import { CommercetoolsConfig, Provider } from '..'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { Category } from '@vercel/commerce/types/site'
import {
  ClientResponse,
  CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk'
import { normalizeCategory } from '../../utils'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSiteInfo({
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<CommercetoolsConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const config = commerce.getConfig(cfg)

    const categories = await config.fetcher<
      ClientResponse<CategoryPagedQueryResponse>
    >({
      query: 'categories',
      method: 'get',
    })

    return {
      categories: categories.body.results.map((category) =>
        normalizeCategory(category, config)
      ),
      brands: [],
    }
  }

  return getSiteInfo
}
