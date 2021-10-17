import type { OperationContext } from '@commerce/api/operations'
import type { Category, GetSiteInfoOperation } from '@commerce/types/site'

import type { CommercejsConfig, Provider } from '../index'

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
    config?: Partial<CommercejsConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { sdkFetch } = commerce.getConfig(config)
    const { data: categories } = await sdkFetch('categories', 'list')

    return {
      categories,
      brands: [],
    }
  }

  return getSiteInfo
}
