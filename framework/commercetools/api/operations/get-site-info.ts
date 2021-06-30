import { Provider, CommercetoolsConfig } from '@framework/api'
import { OperationContext } from '@commerce/api/operations'
import { Category } from '@commerce/types/site'
import { getAllCategoriesAndBrandsQuery } from '@framework/utils/queries/get-category'
import { normalizeSite } from '@framework/lib/normalize'

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
    query = getAllCategoriesAndBrandsQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<CommercetoolsConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const config = commerce.getConfig(cfg)
    const {
      data: { categories, productTypes },
    }: any = await config.fetch(query)
    const ctCategories = categories.results
    const ctBrands =
      productTypes?.results[0]?.attributeDefinitions?.results[0]?.type?.values
        ?.results
    return normalizeSite(ctCategories, ctBrands)
  }

  return getSiteInfo
}
