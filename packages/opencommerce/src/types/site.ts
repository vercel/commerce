import { Vendor as QueryVender, TagEdge } from '../../schema'
import { Category, Brand } from '@vercel/commerce/types/site'

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

export type GetSiteInfoOperation = {
  data: {
    categories: Category[]
    brands: Brand[]
    navigation: Navigation[]
  }
}
