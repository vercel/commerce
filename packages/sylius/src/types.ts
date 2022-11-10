export interface SyliusProduct {
  id: number
  name: string
  shortDescription: string
  description: string
  slug: string
  images: SyliusProductImage[]
  variants: SyliusProductVariant[]
  options: any[]
}

export interface SyliusProductImage {
  id: number
  type: string
  path: string
}

export interface SyliusProductVariant {
  id: number
  price: number
  originalPrice: number
  inStock: boolean
}

export interface SyliusProductOption {
  code: string
  option: string
  value: string
}
