import { Provider, ReactionCommerceConfig } from '../'
import getCollectionsQuery from '../../utils/queries/get-all-collections-query'
import { OperationContext } from '@commerce/api/operations'
import { Category } from '@commerce/types/site'
import getCategories from '../utils/get-categories'
import getVendors from '../utils/get-vendors'

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
    query = getCollectionsQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<ReactionCommerceConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const config = commerce.getConfig(cfg)

    const categories = await getCategories(config)
    const brands = await getVendors(config)

    return {
      categories: categories ?? [],
      brands,
    }
  }

  return getSiteInfo
}
