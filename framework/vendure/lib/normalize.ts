import update from '@framework/lib/immutability'
import { CartFragment, SearchResultFragment } from '@framework/schema'

function normalizeProductOption(productOption: any) {
  const {
    node: {
      entityId,
      values: { edges },
      ...rest
    },
  } = productOption

  return {
    id: entityId,
    values: edges?.map(({ node }: any) => node),
    ...rest,
  }
}

export function normalizeProduct(productNode: any): Product {
  const {
    entityId: id,
    productOptions,
    prices,
    path,
    id: _,
    options: _0,
  } = productNode

  return update(productNode, {
    id: { $set: String(id) },
    images: {
      $apply: ({ edges }: any) =>
        edges?.map(({ node: { urlOriginal, altText, ...rest } }: any) => ({
          url: urlOriginal,
          alt: altText,
          ...rest,
        })),
    },
    variants: {
      $apply: ({ edges }: any) =>
        edges?.map(({ node: { entityId, productOptions, ...rest } }: any) => ({
          id: entityId,
          options: productOptions?.edges
            ? productOptions.edges.map(normalizeProductOption)
            : [],
          ...rest,
        })),
    },
    options: {
      $set: productOptions.edges
        ? productOptions?.edges.map(normalizeProductOption)
        : [],
    },
    brand: {
      $apply: (brand: any) => (brand?.entityId ? brand?.entityId : null),
    },
    slug: {
      $set: path?.replace(/^\/+|\/+$/g, ''),
    },
    price: {
      $set: {
        value: prices?.price.value,
        currencyCode: prices?.price.currencyCode,
      },
    },
    $unset: ['entityId'],
  })
}

export function normalizeSearchResult(item: SearchResultFragment): Product {
  return {
    id: item.productId,
    name: item.productName,
    description: item.description,
    slug: item.slug,
    path: item.slug,
    images: [{ url: item.productAsset?.preview + '?preset=medium' || '' }],
    variants: [],
    price: {
      value: (item.priceWithTax as any).min / 100,
      currencyCode: item.currencyCode,
    },
    options: [],
    sku: item.sku,
  }
}

export function normalizeCart(order: CartFragment): Cart {
  return {
    id: order.id.toString(),
    currency: { code: order.currencyCode },
    subTotal: order.subTotalWithTax / 100,
    total: order.totalWithTax / 100,
    customerId: order.customer?.id as number,
    items: order.lines?.map((l) => ({
      id: l.id,
      name: l.productVariant.name,
      quantity: l.quantity,
      url: l.productVariant.product.slug,
      variantId: l.productVariant.id,
      productId: l.productVariant.productId,
      images: [{ url: l.featuredAsset?.preview + '?preset=thumb' || '' }],
      prices: [],
    })),
  }
}
