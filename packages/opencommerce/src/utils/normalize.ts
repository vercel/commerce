import type {
  Product,
  ProductOption,
  ProductOptionValues,
  ProductVariant,
} from '../types/product'
import { OCCategory, Category, Vendor, OCVendor } from '../types/site'
import {
  CatalogItemProduct,
  CatalogProduct,
  CatalogProductVariant,
  ImageInfo,
} from '../../schema'

const normalizeProductImages = (images: ImageInfo[], name: string) =>
  images.map((image) => ({
    url: image?.URLs?.original || image?.URLs?.medium || '',
    alt: name,
  }))

export function normalizeProduct(
  productNode: CatalogItemProduct | null
): Product {
  const product = productNode?.product
  if (!product) {
    return <Product>{}
  }

  const {
    _id,
    productId,
    title,
    description,
    slug,
    sku,
    media,
    pricing,
    variants,
  } = <CatalogProduct>product

  return {
    id: productId ?? _id,
    name: title ?? '',
    description: description ?? '',
    slug: slug?.replace(/^\/+|\/+$/g, '') ?? '',
    path: slug ?? '',
    sku: sku ?? '',
    images: media?.length
      ? normalizeProductImages(<ImageInfo[]>media, title ?? '')
      : [],
    ...(product.vendor ? { vendor: product.vendor } : {}),
    price: {
      value: pricing[0]?.minPrice ?? 0,
      currencyCode: pricing[0]?.currency.code,
    },
    variants: !!variants
      ? normalizeProductVariants(<CatalogProductVariant[]>variants)
      : [],
    options: !!variants
      ? groupProductOptionsByAttributeLabel(<CatalogProductVariant[]>variants)
      : [],
  }
}

function groupProductOptionsByAttributeLabel(
  variants: CatalogProductVariant[]
): ProductOption[] {
  return variants.reduce(
    (
      groupedOptions: ProductOption[],
      currentVariant: CatalogProductVariant
    ) => {
      groupedOptions = mergeVariantOptionsWithExistingOptions(
        groupedOptions,
        currentVariant
      )

      if (variantHasOptions(currentVariant)) {
        ;(<CatalogProductVariant[]>currentVariant.options).forEach(
          (variantOption) => {
            groupedOptions = mergeVariantOptionsWithExistingOptions(
              groupedOptions,
              variantOption
            )
          }
        )
      }

      return groupedOptions
    },
    []
  )
}

function mergeVariantOptionsWithExistingOptions(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant
): ProductOption[] {
  const matchingOptionIndex = findCurrentVariantOptionsInGroupedOptions(
    groupedOptions,
    currentVariant
  )

  return matchingOptionIndex !== -1
    ? mergeWithExistingOptions(
        groupedOptions,
        currentVariant,
        matchingOptionIndex
      )
    : addNewProductOption(groupedOptions, currentVariant)
}

function addNewProductOption(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant
) {
  return [...groupedOptions, normalizeProductOption(currentVariant)]
}

function findCurrentVariantOptionsInGroupedOptions(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant
): number {
  return groupedOptions.findIndex(
    (option) =>
      option.displayName.toLowerCase() ===
      currentVariant.attributeLabel.toLowerCase()
  )
}

function mergeWithExistingOptions(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant,
  matchingOptionIndex: number
) {
  const currentVariantOption = normalizeProductOption(currentVariant)
  groupedOptions[matchingOptionIndex].values = [
    ...groupedOptions[matchingOptionIndex].values,
    ...currentVariantOption.values,
  ]

  return groupedOptions
}

const normalizeProductVariants = (
  variants: Array<CatalogProductVariant>
): ProductVariant[] => {
  return variants.reduce(
    (productVariants: ProductVariant[], variant: CatalogProductVariant) => {
      if (variantHasOptions(variant)) {
        productVariants.push(...flatVariantOptions(variant))
        return productVariants
      }

      const { sku, title, pricing = [], variantId } = variant ?? {}
      const variantPrice = pricing[0]?.price ?? pricing[0]?.minPrice ?? 0

      productVariants.push(<ProductVariant>{
        id: variantId ?? '',
        name: title,
        sku: sku ?? variantId,
        price: variantPrice,
        listPrice: pricing[0]?.compareAtPrice?.amount ?? variantPrice,
        requiresShipping: true,
        options: [normalizeProductOption(variant)],
      })

      return productVariants
    },
    []
  )
}
const normalizeProductOption = (variant: CatalogProductVariant) => {
  const option = <ProductOption>{
    __typename: 'MultipleChoiceOption',
    id: variant._id,
    displayName: variant.attributeLabel,
    values: variant.optionTitle
      ? [{ label: variant.optionTitle }]
      : [{ label: '' }],
  }
  option.values = option.values.map((value) =>
    colorizeProductOptionValue(value, option.displayName)
  )

  return option
}

function flatVariantOptions(variant: CatalogProductVariant): ProductVariant[] {
  const variantOptions = <CatalogProductVariant[]>variant.options

  return normalizeProductVariants(variantOptions).map((variantOption) => {
    variantOption.options.push(normalizeProductOption(variant))
    return variantOption
  })
}

function variantHasOptions(variant: CatalogProductVariant) {
  return !!variant.options && variant.options.length != 0
}

function colorizeProductOptionValue(
  value: ProductOptionValues,
  displayName: string
): ProductOptionValues {
  if (displayName.toLowerCase() === 'color') {
    value.hexColors = [value.label]
  }
  return value
}

export function normalizeCategory(category: OCCategory): Category {
  return {
    id: category._id,
    name: category.displayTitle ?? '',
    slug: category.slug ?? '',
    path: category.slug ? `/${category.slug}` : '',
  }
}

export function normalizeVendors({ name }: OCVendor): Vendor {
  return {
    node: {
      entityId: name ?? '',
      name: name ?? '',
      path: `brands/${name}`,
    },
  }
}
