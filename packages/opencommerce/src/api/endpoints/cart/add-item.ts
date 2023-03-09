import { normalizeCart, normalizeProduct } from '../../../utils/normalize'
import getCartCookie from '../../utils/get-cart-cookie'
import addCartItemsMutation from '../../mutations/add-cart-item'
import createCartMutation from '../../mutations/create-cart'
import getProductQuery from '../../queries/get-catalog-product-item-query'
import getPrimaryShopQuery from '../../queries/get-primary-shop-query'

import type { CartEndpoint } from '.'
import { PrimaryShopQuery } from '../../../../schema'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  body: { cartId, item },
  config,
  req: { cookies },
}) => {
  if (!item) {
    return {
      data: null,
      errors: [{ message: 'Missing item' }],
    }
  }

  const {
    data: { primaryShop },
  } = await config.fetch<PrimaryShopQuery>(getPrimaryShopQuery)

  if (!primaryShop?._id) {
    return {
      data: null,
    }
  }

  const {
    data: { catalogItemProduct },
  } = await config.fetch(getProductQuery, {
    variables: { slug: item.productId! },
  })

  const product = normalizeProduct(catalogItemProduct)

  const selectedVariant = product.variants.find(
    ({ id }) => id === item.variantId
  )

  if (!selectedVariant) {
    return {
      data: null,
      errors: [{ message: 'Invalid product or variant' }],
    }
  }

  if (!item.quantity) item.quantity = 1

  const variables = {
    input: {
      shopId: primaryShop._id,
      items: [
        {
          productConfiguration: {
            productId: catalogItemProduct.product.productId,
            productVariantId: item.variantId,
          },
          quantity: item.quantity,
          price: {
            amount: selectedVariant?.price?.value || 0,
            currencyCode: product?.price.currencyCode,
          },
        },
      ],
    },
  }

  if (!cartId) {
    const {
      data: { createCart },
    } = await config.fetch(createCartMutation, { variables })
    return {
      data: normalizeCart(createCart.cart),
      headers: {
        'Set-Cookie': [
          getCartCookie(
            config.cartCookie,
            createCart.cart._id,
            config.cartCookieMaxAge
          ),
          getCartCookie(
            config.anonymousCartTokenCookie,
            createCart.token,
            config.cartCookieMaxAge
          ),
        ],
      },
    }
  }

  const {
    data: { addCartItems },
  } = await config.fetch(addCartItemsMutation, {
    variables: {
      input: {
        items: variables.input.items,
        cartId,
        cartToken: cookies.get(config.anonymousCartTokenCookie)?.value,
      },
    },
  })

  return { data: normalizeCart(addCartItems.cart) }
}

export default addItem
