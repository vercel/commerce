import { Vendor as QueryVender, TagEdge } from '../../schema'
import { SiteTypes as CoreSiteTypes } from '@vercel/commerce/types/site'

export * from '@vercel/commerce/types/site'

export type OCCategory = NonNullable<NonNullable<TagEdge>['node']>

export type OCVendor = QueryVender

export type Vendor = {
  node: {
    entityId: string
    name: string
    path: string
  }
}

export type Navigation = {
  url: string
  label: string
  isUrlRelative: boolean
  shouldOpenInNewWindow: boolean
  items?: Navigation[]
}

export type SiteTypes = CoreSiteTypes & {
  navigation: Navigation
}

export type GetSiteInfoOperation<T extends SiteTypes = SiteTypes> = {
  data: {
    categories: T['category'][]
    brands: T['brand'][]
    navigation: T['navigation'][]
  }
}
