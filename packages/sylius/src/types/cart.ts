import {
  SyliusProduct,
  SyliusProductOptionValue,
  SyliusProductVariant,
} from './products'

export interface SyliusOrder {
  id: number
  currencyCode: string
  taxTotal: number
  itemsTotal: number
  total: number
  items: SyliusOrderItem[]
}

export interface SyliusOrderItem {
  id: number
  productName: string
  quantity: number
  unitPrice: number
  discountedUnitPrice: number
  variant: SyliusProductVariant
  optionValues: SyliusProductOptionValue[]
  product: SyliusProduct
}
