import type { GetSiteInfoQuery } from '../../schema'

export * from '@vercel/commerce/types/site'

export type BCCategory = NonNullable<
  GetSiteInfoQuery['site']['categoryTree']
>[0]

export type BCBrand = NonNullable<
  NonNullable<GetSiteInfoQuery['site']['brands']['edges']>[0]
>
