import type { Product } from '@vercel/commerce/types/product'
import type { CommercejsProduct, CommercejsVariant } from '../types'

function getOptionsFromVariantGroups(
  variantGroups: CommercejsProduct['variant_groups']
): Product['options'] {
  const optionsFromVariantGroups = variantGroups.map(
    ({ id, name: variantName, options }) => ({
      id,
      displayName: variantName,
      values: options.map(({ name: optionName }) => ({
        label: optionName,
      })),
    })
  )
  return optionsFromVariantGroups
}

function normalizeVariants(
  variants: Array<CommercejsVariant> = [],
  variantGroups: CommercejsProduct['variant_groups']
) {
  if (!Array.isArray(variants)) return []
  return variants?.map((variant) => ({
    id: variant.id,
    sku: variant.sku ?? variant.id,
    options: Object.entries(variant.options).map(
      ([variantGroupId, variantOptionId]) => {
        const variantGroupFromId = variantGroups.find(
          (group) => group.id === variantGroupId
        )
        const valueLabel = variantGroupFromId?.options.find(
          (option) => option.id === variantOptionId
        )?.name

        return {
          id: variantOptionId,
          displayName: variantGroupFromId?.name || '',
          __typename: 'MultipleChoiceOption' as 'MultipleChoiceOption',
          values: [
            {
              label: valueLabel || '',
            },
          ],
        }
      }
    ),
  }))
}

export function normalizeProduct(
  commercejsProduct: CommercejsProduct,
  commercejsProductVariants: Array<CommercejsVariant> = []
): Product {
  const { id, name, description, permalink, assets, price, variant_groups } =
    commercejsProduct

  return {
    id,
    name,
    description,
    descriptionHtml: description,
    slug: permalink,
    path: `/${permalink}`,
    images:
      assets?.map(({ url, description, filename }) => ({
        url,
        alt: description || filename,
      })) || [],
    price: {
      value: price.raw,
      currencyCode: 'USD',
    },
    variants: normalizeVariants(
      commercejsProductVariants,
      variant_groups || []
    ),
    options: variant_groups ? getOptionsFromVariantGroups(variant_groups) : [],
  }
}
