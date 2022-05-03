import { normalizeCart } from '../../../utils/normalize'
import getCartCookie from '../../utils/get-cart-cookie'
import addCartItemsMutation from '../../mutations/add-cart-item'
import createCartMutation from '../../mutations/create-cart'

import type { CartEndpoint } from '.'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  res,
  body: { cartId, item },
  config,
  req: { cookies },
}) => {
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }
  if (!item.quantity) item.quantity = 1

  const variables = {
    input: {
      shopId: config.shopId,
      items: [
        {
          productConfiguration: {
            productId: item.productId,
            productVariantId: item.variantId,
          },
          quantity: item.quantity,
          price: {
            amount: item.variant?.price,
            currencyCode: item.currencyCode,
          },
        },
      ],
    },
  }

  if (!cartId) {
    const {
      data: { createCart },
    } = await config.fetch(createCartMutation, { variables })
    res.setHeader('Set-Cookie', [
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
    ])

    return res.status(200).json({ data: normalizeCart(createCart.cart) })
  }

  const {
    data: { addCartItems },
  } = await config.fetch(addCartItemsMutation, {
    variables: {
      input: {
        items: variables.input.items,
        cartId,
        cartToken: cookies[config.anonymousCartTokenCookie],
      },
    },
  })

  return res.status(200).json({ data: normalizeCart(addCartItems.cart) })
}

export default addItem
