import { ProductOption } from '../types/product'
import { Category } from '../types/site'
import {
  ProductProjection,
  Image,
  ProductVariant,
  Category as CommercetoolsCategory,
  Cart as CommercetoolsCart,
  LineItem as CommercetoolsLineItem,
  TypedMoney,
  Customer,
  ShoppingList,
  ProductData,
} from '@commercetools/platform-sdk'
import { dedup, withoutNils } from './common'
import { CommerceAPIConfig } from '@vercel/commerce/api'
import getLocalizedString from './localized-string'

const currencyCode = 'USD'

const stringify = (value: any) =>
  typeof value === 'string' ? value : JSON.stringify(value)

const money = (price: TypedMoney | undefined) => {
  return price
    ? {
        value: price.centAmount / 100,
        currencyCode: price.currencyCode,
      }
    : {
        value: -1.0, // error
        currencyCode,
      }
}

const normalizeProductOption = (option: {
  name: string
  value: string | string[]
}): ProductOption => ({
  __typename: 'MultipleChoiceOption',
  id: option.name,
  displayName: option.name,
  values: dedup(
    Array.isArray(option.value) ? option.value : [option.value]
  ).map((val) => {
    if (
      option.name.match(/colou?r/gi) &&
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(val)
    ) {
      return {
        label: stringify(val),
        hexColors: [val],
      }
    } else {
      return {
        label: stringify(val),
      }
    }
  }),
})

const normalizeProductImages = (images: Image[]) =>
  images.map((image) => ({
    url: image.url,
    ...(image.label ? { alt: image.label } : {}),
    width: image.dimensions.w,
    height: image.dimensions.h,
  }))

const normalizeProductVariant = (variant: ProductVariant) => {
  const price = money(
    variant.prices?.find((price) => price.value.currencyCode === currencyCode)
      ?.value ?? variant.prices?.[0]?.value
  ).value

  return {
    id: `${variant.id}`,
    name: `${variant.id}`,
    sku: variant.sku ?? '',
    price,
    options:
      variant.attributes?.map((attribute) =>
        normalizeProductOption({
          name: attribute.name,
          value: attribute.value.key,
        })
      ) ?? [],
    requiresShipping: false,
    listPrice: price,
  }
}

export const normalizeProduct = (
  product: ProductProjection | (ProductData & { id: string }),
  config: CommerceAPIConfig
) => ({
  id: product.id,
  name: getLocalizedString(product.name, config.locale)!,
  slug: getLocalizedString(product.slug, config.locale)!,
  path: `/${getLocalizedString(product.slug, config.locale!)}`,
  description: getLocalizedString(product.description, config.locale) ?? '',
  price: money(
    product.masterVariant.prices?.find(
      (price) => price.value.currencyCode === currencyCode
    )?.value ?? product.masterVariant.prices?.[0]?.value
  ),
  images: normalizeProductImages(
    withoutNils([
      ...(product.masterVariant.images ? product.masterVariant.images : []),
      ...product.variants.flatMap((variant) => variant.images),
    ])
  ),
  variants: [product.masterVariant, ...product.variants].map(
    normalizeProductVariant
  ),
  options: withoutNils([
    ...(product.masterVariant.attributes
      ? product.masterVariant.attributes
      : []),
    ...product.variants.flatMap((variant) => variant.attributes),
  ])
    .reduce(
      (groupedAttributes, attribute) => {
        const groupedAttribute = groupedAttributes.find(
          (gAttr) => gAttr.name === attribute.name
        )
        if (groupedAttribute) {
          groupedAttribute.value.push(stringify(attribute.value.key))
        } else {
          groupedAttributes.push({
            name: attribute.name,
            value: [stringify(attribute.value.key)],
          })
        }
        return groupedAttributes
      },
      [] as {
        name: string
        value: string[]
      }[]
    )
    .map(normalizeProductOption),
})

const normalizeLineItem = (
  lineItem: CommercetoolsLineItem,
  config: CommerceAPIConfig
) => ({
  id: lineItem.id,
  variantId: `${lineItem.variant.id}`,
  productId: lineItem.productId,
  name: getLocalizedString(lineItem.name, config.locale)!,
  path: '',
  quantity: lineItem.quantity,
  discounts: [],
  variant: normalizeProductVariant(lineItem.variant),
  options:
    lineItem.variant.attributes?.map((attribute) => ({
      id: attribute.name,
      name: attribute.name,
      value: attribute.value.key,
    })) ?? [],
})

export const normalizeCart = (
  cart: CommercetoolsCart,
  config: CommerceAPIConfig
) => ({
  id: cart.id,
  customerId: cart.customerId,
  email: cart.customerEmail,
  createdAt: cart.createdAt,
  currency: {
    code: currencyCode,
  },
  taxesIncluded: cart.taxMode !== 'Disabled',
  lineItems: cart.lineItems.map((item) => normalizeLineItem(item, config)),
  lineItemsSubtotalPrice: 0,
  subtotalPrice: money(cart.totalPrice).value,
  totalPrice: money(cart.totalPrice).value,
  discounts: [],
})

export const normalizeCategory = (
  category: CommercetoolsCategory,
  config: CommerceAPIConfig
): Category => ({
  id: category.id,
  name: getLocalizedString(category.name, config.locale)!,
  slug: getLocalizedString(category.slug, config.locale)!,
  path: `/${getLocalizedString(category.slug, config.locale)}`,
})

export const normalizeCustomer = (customer: Customer) => ({
  firstName: customer.firstName,
  lastName: customer.lastName,
  email: customer.email,
})

export const normalizeWishlist = (wishlist: ShoppingList) => ({
  items:
    wishlist.lineItems?.map((item) => ({
      id: item.id,
      product_id: item.productId,
      variant_id: item.variantId!,
    })) ?? [],
})
