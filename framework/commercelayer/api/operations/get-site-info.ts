import { OperationContext } from '@commerce/api/operations'
import { Category } from '@commerce/types/site'
import { CommercelayerConfig } from '../index'

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
    config?: Partial<CommercelayerConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    return Promise.resolve({
      categories: [
        {
          id: 'featured',
          name: 'Featured',
          slug: 'featured',
          path: '/featured',
        },
        {
          id: 'clothings',
          name: 'Clothings',
          slug: 'clothings',
          path: '/clothings',
        },
        {
          id: 'household',
          name: 'Household',
          slug: 'household',
          path: '/household',
        },
      ],
      brands: [],
    })
  }

  return getSiteInfo
}
