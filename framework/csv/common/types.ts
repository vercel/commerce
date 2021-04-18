import { CommerceConfig } from '@commerce'

export type CSVConfig = Partial<CommerceConfig>

export interface Page {
  id: string
  name: string
  url: string
  sort_order?: number
  body: string
}

export interface Category {
  entityId: string
  name: string
  path: string
}

export interface Brand {
  entityId: string
  name: string
  path: string
}
