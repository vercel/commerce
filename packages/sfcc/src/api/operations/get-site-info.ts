import { OperationContext } from '@vercel/commerce/api/operations'
import { Category } from '@vercel/commerce/types/site'
import { SFCCConfig } from '../index'

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
    config?: Partial<SFCCConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    return Promise.resolve({
      categories: [
        {
          id: 'new-arrivals',
          name: 'New Arrivals',
          slug: 'new-arrivals',
          path: '/new-arrivals',
        },
        {
          id: 'womens-clothing-dresses',
          name: 'Womens Clothing Dresses',
          slug: 'womens-clothing-dresses',
          path: '/womens-clothing-dresses',
        },
      ],
      brands: [],
    })
  }

  return getSiteInfo
}
