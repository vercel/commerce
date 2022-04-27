import { normalizeCart } from '../../../utils/normalize'
import getCartCookie from '../../utils/get-cart-cookie'
import addCartItemsMutation from '../../mutations/add-cart-item'
import createCartMutation from '../../mutations/create-cart'

import type { CartEndpoint } from '.'
import { CreateCartPayload } from '../../../../schema'

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
          price: item.price,
        },
      ],
    },
  }

  if (!cartId) {
    const { data } = await config.fetch(createCartMutation, { variables })
    res.setHeader('Set-Cookie', [
      getCartCookie(config.cartCookie, data.cart._id, config.cartCookieMaxAge),
      getCartCookie(
        config.anonymousCartTokenCookie,
        data.token,
        config.cartCookieMaxAge
      ),
    ])

    return res.status(200).json({ data: normalizeCart(data.cart) })
  }

  const { data } = await config.fetch(addCartItemsMutation, {
    variables: {
      input: {
        items: variables.input.items,
        cartId,
        cartToken: cookies[config.anonymousCartTokenCookie],
      },
    },
  })

  return res.status(200).json({ data: normalizeCart(data.cart) })
}

export default addItem
