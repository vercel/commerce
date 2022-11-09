import type { Product } from '@vercel/commerce/types/product'
export type SelectedOptions = Record<string, string | null>
import { Dispatch, SetStateAction } from 'react'

export function getProductVariant(product: Product, opts: SelectedOptions) {
  const variant = product.variants.find((variant) => {
    return Object.entries(opts).every(([key, value]) =>
      variant.options.find((option) => {
        if (
          option.__typename === 'MultipleChoiceOption' &&
          option.displayName.toLowerCase() === key.toLowerCase()
        ) {
          return option.values.find((v) => v.label.toLowerCase() === value)
        }
      })
    )
  })
  return variant
}

export function selectDefaultOptionFromProduct(
  product: Product,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  // Get the first available option or the first option
  const variant =
    product.variants.find((variant) => variant.availableForSale) ||
    product.variants[0]

  // Reset the selectedOptions and set the default option from the available variant
  const newValue: SelectedOptions = {}

  if (variant) {
    for (const c of variant.options) {
      newValue[c.displayName.toLowerCase()] = c.values[0].label.toLowerCase()
    }
  }

  updater(newValue)
}
