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
  SyliusProductOptionValue,
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
      normalizeProductVariant(variant, product.options)
    ),
    price: normalizeProductPrice(
      product.variants[0].price,
      product.variants[0].originalPrice
    ),
    options: product.options.map((option) => normalizeProductOption(option)),
  }
}

const normalizeProductVariant = (
  variant: SyliusProductVariant,
  options: SyliusProductOption[]
): ProductVariant => {
  const availableOptions = variant.optionValues.reduce(
    (accumulator: { [id: number]: ProductOption }, currentOptionValue) => {
      const optionFromOptionValue = options.filter(
        (option: SyliusProductOption) =>
          option.values.some((value) => value.code === currentOptionValue.code)
      )[0]
      if (accumulator.hasOwnProperty(optionFromOptionValue.id.toString())) {
        return {
          ...accumulator,
          [optionFromOptionValue.id]: {
            ...accumulator[optionFromOptionValue.id],
            values: [
              ...accumulator[optionFromOptionValue.id].values,
              {
                label: currentOptionValue.value ?? '',
              },
            ],
          },
        }
      } else {
        const newOption = normalizeProductVariantOption(
          currentOptionValue,
          optionFromOptionValue
        )
        return {
          ...accumulator,
          [newOption.id]: newOption,
        }
      }
    },
    {}
  )
  return {
    id: variant.code,
    options: Object.values(availableOptions),
    availableForSale: variant.inStock,
  }
}

const normalizeProductVariantOption = (
  optionValue: SyliusProductOptionValue,
  option: SyliusProductOption
): ProductOption => {
  return {
    __typename: 'MultipleChoiceOption',
    id: option.id.toString(),
    displayName: option.name,
    values: [
      {
        label: optionValue.value ?? '',
      },
    ],
  }
}

const normalizeProductOption = (option: SyliusProductOption): ProductOption => {
  return {
    __typename: 'MultipleChoiceOption',
    id: option.id.toString(),
    displayName: option.name,
    values: option.values.map((optionValue) =>
      normalizeProductOptionValue(optionValue)
    ),
  }
}

const normalizeProductOptionValue = (
  optionValue: SyliusProductOptionValue
): ProductOptionValues => {
  return {
    label: optionValue.value ?? '',
  }
}

export const normalizeProductImage = (
  image: SyliusProductImage
): ProductImage => {
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
