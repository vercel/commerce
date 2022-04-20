import { Vendor as QueryVender, TagEdge } from '../../schema'

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
