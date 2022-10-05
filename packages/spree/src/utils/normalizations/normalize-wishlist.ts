import MissingProductError from '../../errors/MissingProductError'
import MissingVariantError from '../../errors/MissingVariantError'
import { jsonApi } from '@spree/storefront-api-v2-sdk'
import type { ProductAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import type { WishedItemAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/WishedItem'
import type { WishlistAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Wishlist'
import type { SpreeSdkResponse, VariantAttr } from '../../types'
import normalizeProduct from './normalize-product'
import { Wishlist } from '@vercel/commerce/types/wishlist'

const normalizeWishlist = (
  spreeSuccessResponse: SpreeSdkResponse,
  spreeWishlist: WishlistAttr
): Wishlist => {
  const spreeWishedItems = jsonApi.findRelationshipDocuments<WishedItemAttr>(
    spreeSuccessResponse,
    spreeWishlist,
    'wished_items'
  )

  const items: Wishlist['items'] = spreeWishedItems.map((spreeWishedItem) => {
    const spreeWishedVariant =
      jsonApi.findSingleRelationshipDocument<VariantAttr>(
        spreeSuccessResponse,
        spreeWishedItem,
        'variant'
      )

    if (spreeWishedVariant === null) {
      throw new MissingVariantError(
        `Couldn't find variant for wished item with id ${spreeWishedItem.id}.`
      )
    }

    const spreeWishedProduct =
      jsonApi.findSingleRelationshipDocument<ProductAttr>(
        spreeSuccessResponse,
        spreeWishedVariant,
        'product'
      )

    if (spreeWishedProduct === null) {
      throw new MissingProductError(
        `Couldn't find product for variant with id ${spreeWishedVariant.id}.`
      )
    }

    return {
      id: spreeWishedItem.id,
      productId: spreeWishedProduct.id,
      variantId: spreeWishedVariant.id,
      product: normalizeProduct(spreeSuccessResponse, spreeWishedProduct),
    }
  })

  return {
    id: spreeWishlist.id,
    token: spreeWishlist.attributes.token,
    items,
  }
}

export default normalizeWishlist
