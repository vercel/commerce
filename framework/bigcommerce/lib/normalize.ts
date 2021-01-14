import { Cart, CartItem, Product } from '../../types'
import { Product as BigCommerceProduct } from '@framework/schema'

function normalizeProductOption({
  node: {
    entityId,
    values: { edges },
    ...rest
  },
}: any) {
  return {
    id: entityId,
    values: edges?.map(({ node }: any) => node),
    ...rest,
  }
}

export function normalizeProduct(productNode: BigCommerceProduct): Product {
  const {
    entityId: id,
    images,
    variants,
    productOptions,
    prices,
    path,
    id: _,
    options: _0,
    brand,
    ...rest
  } = productNode

  return {
    id,
    path,
    slug: path?.replace(/^\/+|\/+$/g, ''),
    images: images.edges
      ? images.edges.map(
          ({ node: { urlOriginal, altText, ...rest } }: any) => ({
            url: urlOriginal,
            alt: altText,
            ...rest,
          })
        )
      : [],
    variants: variants.edges
      ? variants.edges.map(
          ({ node: { entityId, productOptions, ...rest } }: any) => ({
            id: entityId,
            options: productOptions?.edges
              ? productOptions.edges.map(normalizeProductOption)
              : [],
            ...rest,
          })
        )
      : [],
    options: productOptions.edges
      ? productOptions?.edges.map(normalizeProductOption)
      : [],
    brand: {
      id: brand?.entityId ? brand?.entityId : null,
      ...brand,
    },
    price: {
      value: prices?.price.value,
      currencyCode: prices?.price.currencyCode,
    },
    ...rest,
  }
}

export function normalizeCart({ data, ...rest }: any): Cart {
  return {
    ...rest,
    data: {
      products: data?.line_items?.physical_items.map(itemsToProducts) ?? [],
      ...data,
    },
  }
}

function itemsToProducts({
  id,
  name,
  quantity,
  product_id,
  variant_id,
  image_url,
  list_price,
  sale_price,
  extended_list_price,
  extended_sale_price,
  ...rest
}: any): CartItem {
  return {
    id,
    name,
    prices: {
      listPrice: list_price,
      salePrice: sale_price,
      extendedListPrice: extended_list_price,
      extendedSalePrice: extended_sale_price,
    },
    images: [
      {
        alt: name,
        url: image_url,
      },
    ],
    productId: product_id,
    variantId: variant_id,
    quantity,
    ...rest,
  }
}
