import { Cart, CartItem, Product } from '../../types'
import update, { extend } from "immutability-helper"

// Allows auto creation when needed
extend('$auto', function(value, object) {
  return object ?
    update(object, value):
    update({}, value);
});

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

export function normalizeCart(cart: any): Cart {
  return update(cart, {
    $auto: {
      products: { $set: cart?.line_items?.physical_items?.map(itemsToProducts)}
    },
    $unset: ['created_time', 'coupons', 'line_items']
  })
}

function itemsToProducts(item: any): CartItem {
  const {
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
  } = item;

  return update(item, {
    $auto: {
      prices: {
        $auto: {
          listPrice: { $set: list_price },
          salePrice: { $set: sale_price } ,
          extendedListPrice: { $set: extended_list_price },
          extendedSalePrice: { $set: extended_sale_price },
        }
      },
      images: { $set: [{
          alt: name,
          url: image_url
        }]},
      productId: { $set: product_id },
      variantId: { $set: variant_id }
    }
  })
}
