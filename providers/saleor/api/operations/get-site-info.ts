import type { OperationContext } from '@commerce/api/operations'
import { Category } from '@commerce/types/site'
import type { SaleorConfig, Provider } from '..'

import { getCategories, getVendors } from '../../utils'

interface GetSiteInfoResult {
  categories: Category[]
  brands: any[]
}

export default function getSiteInfoOperation({ commerce }: OperationContext<Provider>) {
  async function getSiteInfo({
    query,
    config,
    variables,
  }: {
    query?: string
    config?: Partial<SaleorConfig>
    preview?: boolean
    variables?: any 
  } = {}): Promise<GetSiteInfoResult> {
    const cfg = commerce.getConfig(config)

    const categories = await getCategories(cfg)
    const brands = await getVendors(cfg)

    return {
      categories,
      brands,
    }
  }

  return getSiteInfo
}
