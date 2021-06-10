import { OperationContext } from '@commerce/api/operations'
import { Category } from '@commerce/types/site'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({}: OperationContext<any>) {
  function getSiteInfo(): Promise<GetSiteInfoResult> {
    return Promise.resolve({
      categories: [],
      brands: [],
    })
  }

  return getSiteInfo
}
