export interface RawVariantProperty {
  name: string
  value: string
  defining?: boolean
}

export interface RawVariantProperties {
  [key: string]: RawVariantProperty
}

export interface RawVariant {
  id: number
  main: boolean
  available: boolean
  sku: string
  name: string
  slug: string
  min_quantity: number
  quantity: number
  quantity_sold: number
  stock: number
  custom_attributes: object
  properties?: RawVariantProperties
  updated_at: string
  price: number
  installments: number[]
  available_quantity: number
  weight: number
  width: number
  height: number
  length: number
  handling_days: number
  inventories: any[]
  sale_price: number
  intl_price: number
  image_url: string
  product_id: number
  barcode: string
  norder: number
}

export interface RawProduct {
  id: number
  name: string
  active: boolean
  available: boolean
  description: string | null
  html_description?: string | null
  image_url?: string | null
  price: number
  sale_price: number
  reference: string
  slug: string
  url: string
  variants?: RawVariant[]
}

export interface RawProductImages {
  id: number
  url: string
  updated_at: string
  variant_ids?: string[] | number[]
}
