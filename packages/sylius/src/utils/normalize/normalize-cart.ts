import {
  Cart,
  ProductVariant,
  SelectedOption,
} from '@vercel/commerce/types/cart'
import { LineItem } from '@vercel/commerce/types/cart'
import { Discount } from '@vercel/commerce/types/common'
import { SyliusAdjustment, SyliusOrder, SyliusOrderItem } from 'types/cart'
import {
  SyliusProduct,
  SyliusProductOption,
  SyliusProductOptionValue,
  SyliusProductVariant,
} from 'types/products'
import { normalizeProductImage } from './normalize-product'

export const normalizeCart = (syliusOrder: SyliusOrder): Cart => {
  return {
    id: syliusOrder.id.toString(),
    createdAt: '',
    currency: { code: syliusOrder.currencyCode },
    taxesIncluded: syliusOrder.total !== syliusOrder.taxExcludedTotal,
    lineItems: syliusOrder.items.map((item) => normalizeOrderItem(item)),
    lineItemsSubtotalPrice: syliusOrder.itemsTotal / 100,
    subtotalPrice: syliusOrder.itemsTotal / 100,
    totalPrice: syliusOrder.total / 100,
  }
}

const normalizeOrderItem = (syliusOrderItem: SyliusOrderItem): LineItem => {
  return {
    id: syliusOrderItem.id.toString(),
    variantId: syliusOrderItem.variant.id.toString(),
    productId: syliusOrderItem.product.id.toString(),
    name: syliusOrderItem.productName,
    quantity: syliusOrderItem.quantity,
    path: syliusOrderItem.product.slug,
    variant: normalizeOrderItemVariant(
      syliusOrderItem.variant,
      syliusOrderItem.product
    ),
    options: syliusOrderItem.variant.optionValues.map((optionValue) =>
      normalizeOrderItemOptionValue(
        optionValue,
        syliusOrderItem.product.options
      )
    ),
    discounts: syliusOrderItem.adjustments.map((adjustment) =>
      normalizeAdjustment(adjustment)
    ),
  }
}

const normalizeOrderItemVariant = (
  syliusVariant: SyliusProductVariant,
  syliusProduct: SyliusProduct
): ProductVariant => {
  return {
    id: syliusVariant.id.toString(),
    sku: '',
    name: syliusVariant.name,
    requiresShipping: false,
    price: syliusVariant.price / 100,
    listPrice: syliusVariant.originalPrice / 100,
    isInStock: syliusVariant.inStock,
    image:
      syliusProduct.images.length > 0
        ? normalizeProductImage(syliusProduct.images[0])
        : undefined,
  }
}

const normalizeOrderItemOptionValue = (
  optionValue: SyliusProductOptionValue,
  options: SyliusProductOption[]
): SelectedOption => {
  const rightOption = options.filter((option) =>
    option.values.some((value) => value.code === optionValue.code)
  )[0]
  return {
    id: rightOption.id.toString(),
    name: rightOption.name,
    value: optionValue.value,
  }
}

const normalizeAdjustment = (adjustment: SyliusAdjustment): Discount => {
  return {
    value: adjustment.amount / 100,
  }
}
