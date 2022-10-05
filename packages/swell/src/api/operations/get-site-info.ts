import getCategories from '../../utils/get-categories'
import getVendors from '../../utils/get-vendors'
import { Provider, SwellConfig } from '../'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { Brand, Category } from '@vercel/commerce/types/site'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: Brand[]
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
    config?: Partial<SwellConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const config = commerce.getConfig(cfg)
    const categories = await getCategories(config)
    const brands = await getVendors(config)

    return {
      categories,
      brands,
    }
  }

  return getSiteInfo
}
