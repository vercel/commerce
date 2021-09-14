import {
  Image as MedusaImage,
  MoneyAmount as MedusaMoneyAmount,
  Product as MedusaProduct,
  ProductOption as MedusaProductOption,
  ProductVariant as MedusaProductVariant,
} from '@medusajs/medusa-js/lib/types'

import type {
  Product,
  ProductImage,
  ProductOption,
  ProductPrice,
  ProductVariant,
} from '../../types/product'

export function normalizeProductImages(images: MedusaImage[]): ProductImage[] {
  if (!images || images.length < 1) {
    return [{ url: '/' }]
  }

  console.error(images)
  return images.map(({ url }: MedusaImage) => ({
    url,
  }))
}

export function normalizeAvailability(variant: MedusaProductVariant): boolean {
  if (
    variant.manage_inventory &&
    !variant.allow_backorder &&
    variant.inventory_quantity < 1
  )
    return false
  return true
}

export function normalizeProductVariants(
  variants: MedusaProductVariant[]
): ProductVariant[] {
  return variants.map((variant) => {
    return {
      id: variant.id,
      options: [], //variants don't have options
      availableForSale: normalizeAvailability(variant),
    }
  })
}

export function normalizePrice(price: MedusaMoneyAmount): ProductPrice {
  return {
    value: price.amount / 100,
    currencyCode: price.currency_code.toUpperCase(),
  }
}

export function normalizeOptions(
  options: MedusaProductOption[]
): ProductOption[] {
  return options.map((opt) => ({
    id: opt.id,
    displayName: opt.title,
    values: opt.values.map((val) => {
      return {
        label: val.value,
      }
    }),
  }))
}

export function normalizeProduct({
  id,
  title: name,
  description,
  variants: medusaVariants,
  options: medusaOptions,
  images,
  handle: slug,
  thumbnail,
}: MedusaProduct): Product {
  const tmpVariant = medusaVariants.reduce((prev, curr) =>
    prev.prices.amount < curr.prices.amount ? prev : curr
  )

  const minPrice = normalizePrice(tmpVariant.prices[0]) //need to fix typing in medusa types

  return {
    id,
    name,
    description: description || '',
    variants: normalizeProductVariants(medusaVariants),
    images: thumbnail && !images.length ? [{ url: thumbnail }] : images,
    options: normalizeOptions(medusaOptions),
    price: minPrice,
    path: `/${slug}`,
    slug,
  }
}
