import type {
  Product,
  ProductImage,
  ProductOption,
  ProductVariant,
} from '@vercel/commerce/types/product'
import type {
  Variant,
  Product as ProductRequest,
  ProductImage as ProductImageRequest,
} from '@vnda/headless-framework'

export const getLastItem = (path: string) =>
  path.substring(path.lastIndexOf('/') + 1)

const getRelativePaths = (url: string) =>
  !['http:', 'https:'].includes(url) ? `https:${url}` : url

export const getVariantOptions = (variant: Variant): ProductOption[] =>
  Object.entries(variant.properties || [])
    .filter(([_, { value }]) => !!value && !!value)
    .map(([_, property]) => ({
      __typename: 'MultipleChoiceOption',
      id: `option-${property.name.toLocaleLowerCase()}`,
      displayName: property.name,
      values: [{ label: property.value }],
    }))

export const mapImagesRawToCommerceResponse = (
  images: ProductImageRequest[]
): ProductImage[] =>
  (images || []).map((item) => ({
    url: getRelativePaths(item.url),
    alt: `image-for-item-id-${item.id}`,
  }))

export const mapVariantsOptionsToCommerceCommerce = (
  variants: Variant[]
): ProductOption[] => {
  if (!variants || !variants.length) {
    return []
  }

  let options: ProductOption[] = []

  variants.forEach((variant) => {
    const opts = getVariantOptions(variant)

    opts.forEach((opt) => {
      if (options.filter((option) => option.id !== opt.id)) {
        options.push({
          id: opt.id,
          displayName: opt.displayName,
          values: opt.values,
        })
      }
    })
  })

  var ids = Array.from(new Set(options.map((d) => d.id)))

  options = ids.map((id) => {
    let values: any[] = []

    options
      .filter((option) => option.id === id)
      .map(({ values }) =>
        values?.forEach(({ label, hexColors }) => {
          if (label && !values.find((value) => value?.label === label)) {
            values.push({ label, hexColors })
          }
        })
      )

    return {
      id,
      displayName: options.find((option) => option.id === id)?.displayName!,
      values: Array.from(new Set(values)),
    }
  })

  return options
}

export const mapVariantsRawToCommerceResponse = (
  variants: Variant[]
): ProductVariant[] =>
  (variants || []).map((variant) => ({
    id: variant.sku,
    options: getVariantOptions(variant),
    availableForSale: variant.stock ? variant.stock > 0 : false,
  }))

export const mapItemRawToCommerceResponse = (
  product: ProductRequest
): Product => ({
  id: product.id.toString(),
  description: product.description || '',
  images: product.imageUrl ? [{ url: getRelativePaths(product.imageUrl) }] : [],
  name: product.name,
  price: {
    value: product.price,
    currencyCode: 'BRL',
    salePrice: product.salePrice,
  },
  ...(product.htmlDescription && {
    descriptionHtml: product.htmlDescription,
  }),
  sku: product.reference,
  slug: `${product.slug}-${product.id.toString()}`,
  path: product.url ? getLastItem(product.url) : undefined,
  options: [],
  variants: [],
})

export const extractProductId = (value?: string) => {
  if (!value || typeof value !== 'string') {
    return value
  }

  return value.substring(value.lastIndexOf('-') + 1)
}
