import type { CartHandlers } from '../'
import getAnonymousCartQuery from '@framework/utils/queries/get-anonymous-cart'
import accountCartByAccountIdQuery from '@framework/utils/queries/account-cart-by-account-id'
import getCartCookie from '@framework/api/utils/get-cart-cookie'
import reconcileCarts from '@framework/api/utils/reconcile-carts'
import getViewerId from '@framework/customer/get-viewer-id'
import {
  REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  REACTION_CART_ID_COOKIE,
  REACTION_CUSTOMER_TOKEN_COOKIE,
} from '@framework/const'
import { normalizeCart } from '@framework/utils'

// Return current cart info
const getCart: CartHandlers['getCart'] = async ({ req, res, config }) => {
  const {
    cookies: {
      [REACTION_ANONYMOUS_CART_TOKEN_COOKIE]: anonymousCartToken,
      [REACTION_CART_ID_COOKIE]: cartId,
      [REACTION_CUSTOMER_TOKEN_COOKIE]: reactionCustomerToken,
    },
  } = req

  let normalizedCart

  if (cartId && anonymousCartToken && reactionCustomerToken) {
    const rawReconciledCart = await reconcileCarts({
      config,
      cartId,
      anonymousCartToken,
      reactionCustomerToken,
    })

    normalizedCart = normalizeCart(rawReconciledCart)

    // Clear the anonymous cart token cookie and update cart ID cookie
    res.setHeader('Set-Cookie', [
      getCartCookie(config.anonymousCartTokenCookie),
      getCartCookie(config.cartIdCookie, normalizedCart.id, 999),
    ])
  } else if (cartId && anonymousCartToken) {
    const {
      data: { cart: rawAnonymousCart },
    } = await config.fetch(getAnonymousCartQuery, {
      variables: {
        cartId,
        cartToken: anonymousCartToken,
      },
    })

    normalizedCart = normalizeCart(rawAnonymousCart)
  } else if (reactionCustomerToken && !anonymousCartToken) {
    const accountId = await getViewerId({
      customerToken: reactionCustomerToken,
      config,
    })

    const {
      data: { cart: rawAccountCart },
    } = await config.fetch(
      accountCartByAccountIdQuery,
      {
        variables: {
          accountId,
          shopId: config.shopId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${reactionCustomerToken}`,
        },
      }
    )

    normalizedCart = normalizeCart(rawAccountCart)

    if (cartId !== normalizedCart.id) {
      res.setHeader(
        'Set-Cookie',
        getCartCookie(config.cartIdCookie, rawAccountCart._id, 999)
      )
    }
  } else {
    // If there's no cart for now, store a dummy cart ID to keep Next Commerce happy
    res.setHeader(
      'Set-Cookie',
      getCartCookie(config.cartIdCookie, config.dummyEmptyCartId, 999)
    )
  }

  res.status(200).json({ data: normalizedCart ?? null })
}

export default getCart
