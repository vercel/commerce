import { OperationContext } from '@commerce/api/operations'
import { Category } from '@commerce/types/site'
import { MedusaConfig } from '..'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({}: OperationContext<any>) {
  function getSiteInfo({
    query,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<MedusaConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    /** We should add collections to our Storefront API,
     * so we can populate the site with collections here
     */
    return Promise.resolve({
      categories: [],
      brands: [],
    })
  }

  return getSiteInfo
}
