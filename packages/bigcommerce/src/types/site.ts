import * as Core from '@vercel/commerce/types/site'
import type { GetSiteInfoQuery, GetSiteInfoQueryVariables } from '../../schema'

export * from '@vercel/commerce/types/site'

export type BCCategory = NonNullable<
  GetSiteInfoQuery['site']['categoryTree']
>[0]

export type Brand = NonNullable<
  NonNullable<GetSiteInfoQuery['site']['brands']['edges']>[0]
>

export type SiteTypes = {
  category: Core.Category
  brand: Brand
}

export type GetSiteInfoOperation = Core.GetSiteInfoOperation<SiteTypes>
