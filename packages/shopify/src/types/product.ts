import * as Core from '@vercel/commerce/types/product'

export * from '@vercel/commerce/types/product'

type LiteralUnion<T extends string> = T | Omit<T, T>

export type MetaieldTypes =
  | 'integer'
  | 'boolean'
  | 'color'
  | 'json'
  | 'date'
  | 'file_reference'
  | 'date_time'
  | 'dimension'
  | 'multi_line_text_field'
  | 'number_decimal'
  | 'number_integer'
  | 'page_reference'
  | 'product_reference'
  | 'rating'
  | 'single_line_text_field'
  | 'url'
  | 'variant_reference'
  | 'volume'
  | 'weight'
  | 'list.color'
  | 'list.date'
  | 'list.date_time'
  | 'list.dimension'
  | 'list.file_reference'
  | 'list.number_integer'
  | 'list.number_decimal'
  | 'list.page_reference'
  | 'list.product_reference'
  | 'list.rating'
  | 'list.single_line_text_field'
  | 'list.url'
  | 'list.variant_reference'
  | 'list.volume'
  | 'list.weight'

export type MetafieldType = LiteralUnion<MetaieldTypes>

export type ProductCustomField = Core.ProductCustomField & {
  type?: MetafieldType
}

export type Product = Core.Product & {
  metafields?: ProductCustomField[]
}
