import * as Core from '@vercel/commerce/types/product'

export type Product = Core.Product

export type ProductVariant = Core.ProductVariant & {
  price?: number
}

export type ProductOption = Core.ProductOption

export type ProductOptionValues = Core.ProductOptionValues
