import type { OperationContext } from '@vercel/commerce/api/operations'
import type { Category, GetSiteInfoOperation } from '../../types/site'
import { normalizeCategory } from '../../utils/normalize-category'
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

    const formattedCategories = categories.map(normalizeCategory)

    return {
      categories: formattedCategories,
      brands: [],
    }
  }

  return getSiteInfo
}
