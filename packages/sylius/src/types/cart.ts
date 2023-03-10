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
  taxExcludedTotal: number
  taxIncludedTotal: number
  shippingTotal: number
  orderPromotionTotal: number
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
  adjustments: SyliusAdjustment[]
}

export interface SyliusAdjustment {
  id: number
  type: string
  label: string
  amount: number
}
