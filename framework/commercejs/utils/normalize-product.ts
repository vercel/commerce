import type { Product, CommercejsProduct } from '../types/product'

const getOptionColor = (variantName: string, optionName: string) => {
  const isColorVariant = variantName.match(/colou?r/gi)
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

// Build a list of all possible variants from variants groups.
function normalizeVariants(
  variantGroups: CommercejsProduct['variant_groups']
): Product['variants'] {
  const variants = variantGroups.reduce((allVariants, variantGroup) => {
    variantGroup.options.forEach((option) => {
      allVariants.push({
        // Include variant group and option Id so that specific variants can be added with commerce.cart.add()
        id: `${variantGroup.id}-${option.id}`,
        options: [
          {
            id: variantGroup.id,
            displayName: variantGroup.name,
            __typename: 'MultipleChoiceOption',
            values: [
              {
                label: option.name,
                hexColors: getOptionColor(variantGroup.name, option.name),
              },
            ],
          },
        ],
      })
    })
    return allVariants
  }, [] as Product['variants'])

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
