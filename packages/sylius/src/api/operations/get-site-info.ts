import { OperationContext } from '@vercel/commerce/api/operations'
import { Category } from '@vercel/commerce/types/site'
import { SyliusCategorie } from 'types/site'
import { TAXONS_ENDPOINT } from '../../utils/constant/api-endpoints'
import { normalizeCategorie } from '../../utils/normalize/normalize-site'
import { SyliusConfig, Provider } from '../index'

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
    query,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<SyliusConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const config = commerce.getConfig(cfg)
    const syliusCategories = await config.fetch('GET', TAXONS_ENDPOINT)
    const categories = syliusCategories.map(
      (syliusCategories: SyliusCategorie) =>
        normalizeCategorie(syliusCategories)
    )
    return {
      categories: categories,
      brands: [],
    }
  }

  return getSiteInfo
}
