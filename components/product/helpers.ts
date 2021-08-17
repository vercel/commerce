import type { Product, ProductVariant } from '@commerce/types/product'
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
  // Selects the default option
  product.variants[0]?.options?.forEach((v) => {
    updater((choices) => ({
      ...choices,
      [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
    }))
  })
}

export function getSelectedOptionsIds(
  variant: ProductVariant,
  opts: SelectedOptions
) {
  const [selected] = variant.options.filter((option) => {
    const type = option.displayName.toLowerCase()
    const typeSelected = option.values.filter(
      ({ label }) => label.toLowerCase() === opts[type]
    )
    if (typeSelected.length > 0) return true
    return false
  })
  return selected
    ? {
        [`${selected.displayName?.toLowerCase()}Id`]: selected.id,
      }
    : {}
}
