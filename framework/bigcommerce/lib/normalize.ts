import update from "@framework/lib/immutability"
import { Cart, CartItem, Product } from '../../types'

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

export function normalizeCart(data: any): Cart {
  return update(data, {
    $auto: {
      items: { $set: data?.line_items?.physical_items?.map(itemsToProducts)},
      subTotal: { $set: data?.base_amount },
      total: { $set: data?.cart_amount }
    },
    $unset: ['created_time', 'coupons', 'line_items', 'email']
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
