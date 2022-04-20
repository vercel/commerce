import { Product as SFCCProduct, Search } from 'commerce-sdk'
import type {
  Product,
  ProductImage,
  ProductOption,
  ProductVariant,
} from '@vercel/commerce/types/product'

const normaliseOptions = (
  options: SFCCProduct.ShopperProducts.Product['variationAttributes']
): Product['options'] => {
  if (!Array.isArray(options)) return []

  return options.map((option) => {
    return {
      id: option.id,
      displayName: option.name as string,
      values: option.values!.map((value) => ({ label: value.name })),
    } as ProductOption
  })
}

const normaliseVariants = (
  variants: SFCCProduct.ShopperProducts.Product['variants']
): Product['variants'] => {
  if (!Array.isArray(variants)) return []

  return variants.map((variant) => {
    const options = [] as ProductOption[]

    if (variant.variationValues) {
      for (const [key, value] of Object.entries(variant.variationValues)) {
        const variantOptionObject = {
          id: `${variant.productId}-${key}`,
          displayName: key,
          values: [
            {
              label: value,
            },
          ],
        }
        options.push(variantOptionObject)
      }
    }

    return {
      id: variant.productId,
      options,
    } as ProductVariant
  })
}

export function normalizeProduct(
  product: SFCCProduct.ShopperProducts.Product
): Product {
  return {
    id: product.id,
    // TODO: use `name-ID` as a virtual slug (for search 1:1)
    slug: product.id, // use product ID as a slug
    name: product.name!,
    description: product.longDescription!,
    price: {
      value: product.price!,
      currencyCode: product.currency,
    },
    images: product.imageGroups![0].images.map((image) => ({
      url: image.disBaseLink,
      altText: image.title,
    })) as ProductImage[],
    variants: normaliseVariants(product.variants),
    options: normaliseOptions(product.variationAttributes),
  }
}

export function normalizeSearchProducts(
  products: Search.ShopperSearch.ProductSearchHit[]
): Product[] {
  return products.map((product) => ({
    id: product.productId,
    slug: product.productId, // use product ID as a slug
    name: product.productName!,
    description: '',
    price: {
      value: product.price!,
      currencyCode: product.currency,
    },
    images: [
      {
        url: product.image!.link,
        altText: product.productName,
      } as ProductImage,
    ],
    variants: normaliseVariants(product.variants),
    options: normaliseOptions(product.variationAttributes),
  }))
}
