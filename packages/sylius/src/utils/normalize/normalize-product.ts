import {
  Product,
  ProductImage,
  ProductOption,
  ProductOptionValues,
  ProductPrice,
  ProductVariant,
} from '@vercel/commerce/types/product'
import {
  SyliusProduct,
  SyliusProductImage,
  SyliusProductOption,
  SyliusProductOptionValues,
  SyliusProductVariant,
} from '../../types/products'

export const normalizeProduct = (product: SyliusProduct): Product => {
  return {
    id: product.id.toString(),
    name: product.name,
    description: product.shortDescription,
    descriptionHtml: product.description,
    slug: product.slug,
    path: `/${product.slug}`,
    images: product.images.map((image) => normalizeProductImage(image)),
    variants: product.variants.map((variant) =>
      normalizeProductVariant(variant)
    ),
    price: normalizeProductPrice(
      product.variants[0].price,
      product.variants[0].originalPrice
    ),
    options: product.options.map((option) => normalizeProductOption(option)),
  }
}

const normalizeProductVariant = (
  variant: SyliusProductVariant
): ProductVariant => {
  const options =
    variant.optionValues.length > 0
      ? [
          {
            id: '',
            displayName: '',
            values: variant.optionValues.map((optionValue) =>
              normalizeProductOptionValue(optionValue)
            ),
          },
        ]
      : []
  return {
    id: variant.id,
    options: options,
    availableForSale: variant.inStock,
  }
}

const normalizeProductOption = (option: SyliusProductOption): ProductOption => {
  return {
    id: option.id.toString(),
    displayName: option.name,
    values: option.values.map((optionValue) =>
      normalizeProductOptionValue(optionValue)
    ),
  }
}

const normalizeProductOptionValue = (
  optionValue: SyliusProductOptionValues
): ProductOptionValues => {
  return {
    label: optionValue.value ?? '',
  }
}

const normalizeProductImage = (image: SyliusProductImage): ProductImage => {
  return {
    url: process.env.NEXT_PUBLIC_SYLIUS_ALLOWED_IMAGE_URL + image.path,
  }
}

const normalizeProductPrice = (
  price: number,
  originalPrice: number
): ProductPrice => {
  return {
    value: originalPrice / 100,
    salePrice: price / 100,
    currencyCode: 'EUR',
  }
}
