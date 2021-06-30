import * as Core from '@commerce/types/product'
export type CommercetoolsProduct = {
  id: string
  name: LocalString
  description: LocalString
  slug: LocalString
  metaDescription: LocalString
  masterVariant: CommercetoolsProductVariant
  variants: CommercetoolsProductVariant[]
  published: boolean
}
export type CommercetoolsProductVariant = {
  id: string
  key: string
  sku: string
  images: Images[]
  price?: CommerceToolsProductPrice
  prices: CommerceToolsProductPrice[]
  attributes: ProductAttributes[]
}
export type ProductAttributes = {
  name: string
  value: string | AttributeDefinition | boolean | number
}
export type AttributeDefinition = {
  key: string
  label: string
}
export type Images = {
  url: string
  dimensions: {
    w: number
    h: number
  }
}
export type CommerceToolsProductPrice = {
  id: string
  value: Money
  discounted: DiscountedPrice
}
export type DiscountedPrice = {
  value: Money
}
export type Money = {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}
export type LocalString = {
  en: string
  'es-AR': string
  'es-CL': string
  'es-PE': string
  de: string
}
// get Product
export type GetProductById = {
  id: string
}
export type Product = Core.Product
export type ProductVariant = Core.ProductVariant
export type ProductPrice = Core.ProductPrice
export type ProductOption = Core.ProductOption
export type ProductOptionValue = Core.ProductOptionValues
export type ProductImage = Core.ProductImage
