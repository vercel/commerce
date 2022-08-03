import type { OperationContext } from '@vercel/commerce/api/operations'
import type {
  Category,
  GetSiteInfoOperation,
} from '@vercel/commerce/types/site'

import type { OlistConfig, Provider } from '..'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSiteInfo<T extends GetSiteInfoOperation>({
    config,
  }: {
    query?: string
    variables?: any
    config?: Partial<OlistConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { service } = commerce.getConfig(config)

    const tags = await service.tag.list({ paginate: { perPage: 10 } })

    return {
      categories:
        tags?.map((category, idx) => ({
          id: category.name,
          name: category.name || `name-${idx}`,
          slug: category.name || `slug-${idx}`,
          path: `/${category.name}`,
        })) || [],
      brands: [],
    }
  }

  return getSiteInfo
}
