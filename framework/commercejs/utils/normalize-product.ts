import type { Product } from '@commerce/types/product'
import type { Product as CommercejsProduct } from '@chec/commerce.js/types/product'

const getOptionColor = (variantName: string, optionName: string) => {
  const isColorVariant = variantName.toLowerCase() === 'color'
  if (!isColorVariant) return []
  return [optionName]
}

function getOptionsFromVariantGroups(
  variantGroups: CommercejsProduct['variant_groups']
): Product['options'] {
  const optionsFromVariantGroups = variantGroups.map(
    ({ id, name: variantName, options }) => ({
      id,
      displayName: variantName,
      values: options.map(({ name: optionName }) => ({
        label: optionName,
        hexColors: getOptionColor(variantName, optionName),
      })),
    })
  )
  return optionsFromVariantGroups
}

function normalizeVariants(
  variantGroups: CommercejsProduct['variant_groups']
): Product['variants'] {
  const variants = variantGroups.map((variantGroup) => ({
    id: variantGroup.id,
    options: getOptionsFromVariantGroups([variantGroup]),
  }))
  return variants
}

export function normalizeProduct(
  commercejsProduct: CommercejsProduct
): Product {
  const { id, name, description, permalink, assets, price, variant_groups } =
    commercejsProduct
  return {
    id,
    name,
    description,
    descriptionHtml: description,
    slug: permalink,
    path: permalink,
    images: assets.map(({ url, description, filename }) => ({
      url,
      alt: description || filename,
    })),
    price: {
      value: price.raw,
      currencyCode: 'USD',
    },
    variants: normalizeVariants(variant_groups),
    options: getOptionsFromVariantGroups(variant_groups),
  }
}
