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
    // Categories (or collections) are not currently exposed
    // in the Medusa Storefront API. Once this is implemented
    // this method will be updated.
    return Promise.resolve({
      categories: [],
      brands: [],
    })
  }

  return getSiteInfo
}
