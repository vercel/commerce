import { Cart, CartItem, Product } from '../../types'
import { Product as BigCommerceProduct } from '@framework/schema'
import update from "immutability-helper"

function normalizeProductOption(productOption:any) {
  const {
    node: {
      entityId,
      values: { edges },
      ...rest
    },
  } = productOption;

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
      $apply: ({edges} : any) => edges?.map(
        ({ node: { urlOriginal, altText, ...rest } }: any) => ({
          url: urlOriginal,
          alt: altText,
          ...rest,
        })
      )
    }, 
    variants: {
      $apply: ({edges} : any) => edges?.map(
        ({ node: { entityId, productOptions, ...rest } }: any) => ({
          id: entityId,
          options: productOptions?.edges
            ? productOptions.edges.map(normalizeProductOption)
            : [],
          ...rest,
        })
      )
    },
    options: {
      $set: productOptions.edges ? productOptions?.edges.map(normalizeProductOption) : []
    },
    brand: {
      $apply:(brand : any) => brand?.entityId ? brand?.entityId : null,
    }, 
    slug: { 
      $set: path?.replace(/^\/+|\/+$/g, '')
    },
    price: {
      $set: {
        value: prices?.price.value,
        currencyCode: prices?.price.currencyCode,
      }
    }, 
    $unset: ['entityId']
  })
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
