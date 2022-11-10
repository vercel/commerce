import {
  Product,
  ProductImage,
  ProductPrice,
  ProductVariant,
} from '@vercel/commerce/types/product'
import {
  SyliusProduct,
  SyliusProductImage,
  SyliusProductVariant,
} from '../types'

export const normalizeProduct = (product: SyliusProduct): Product => {
  return {
    id: product.id.toString(),
    name: product.name,
    description: product.description,
    images: product.images.map((image) => normalizeProductImage(image)),
    variants: product.variants.map((variant) =>
      normalizeProductVariant(variant)
    ),
    price: normalizeProductPrice(
      product.variants[0].price,
      product.variants[0].originalPrice
    ),
    options: [],
  }
}

const normalizeProductVariant = (
  variant: SyliusProductVariant
): ProductVariant => {
  return {
    id: variant.id,
    options: [],
    availableForSale: variant.inStock,
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
