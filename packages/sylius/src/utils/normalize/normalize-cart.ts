import {
  Cart,
  ProductVariant,
  SelectedOption,
} from '@vercel/commerce/types/cart'
import { LineItem } from '@vercel/commerce/types/cart'
import { SyliusOrder, SyliusOrderItem } from 'types/cart'
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
    taxesIncluded: syliusOrder.taxTotal > 0,
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
    discounts: [],
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
