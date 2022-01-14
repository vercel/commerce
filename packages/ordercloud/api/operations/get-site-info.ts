import type { OperationContext } from '@commerce/api/operations'
import type { Category, GetSiteInfoOperation } from '@commerce/types/site'

import type { RawCategory } from '../../types/category'
import type { OrdercloudConfig, Provider } from '../index'

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
    config?: Partial<OrdercloudConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    // Get fetch from the config
    const { restBuyerFetch } = commerce.getConfig(config)

    // Get list of categories
    const rawCategories: RawCategory[] = await restBuyerFetch<{
      Items: RawCategory[]
    }>('GET', `/me/categories`).then((response) => response.Items)

    return {
      // Normalize categories
      categories: rawCategories.map((category) => ({
        id: category.ID,
        name: category.Name,
        slug: category.ID,
        path: `/${category.ID}`,
      })),
      brands: [],
    }
  }

  return getSiteInfo
}
