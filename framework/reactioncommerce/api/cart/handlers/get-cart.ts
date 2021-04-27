import type { Cart } from '../../../types'
import type { CartHandlers } from '../'
import getAnomymousCartQuery from '@framework/utils/queries/get-anonymous-cart'
import accountCartByAccountIdQuery from '@framework/utils/queries/account-cart-by-account-id'
import reconcileCartsMutation from '@framework/utils/mutations/reconcile-carts'
import getCartCookie from '@framework/api/utils/get-cart-cookie'
import getViewerId from '@framework/customer/get-viewer-id'
import {
  REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  REACTION_ANONYMOUS_CART_ID_COOKIE,
  REACTION_CUSTOMER_TOKEN_COOKIE,
} from '@framework/const.ts'
import { normalizeCart } from '@framework/utils'

// Return current cart info
const getCart: CartHandlers['getCart'] = async ({ req, res, config }) => {
  const {
    cookies: {
      [REACTION_ANONYMOUS_CART_TOKEN_COOKIE]: anonymousCartToken,
      [REACTION_ANONYMOUS_CART_ID_COOKIE]: anonymousCartId,
      [REACTION_CUSTOMER_TOKEN_COOKIE]: reactionCustomerToken,
    },
  } = req

  let normalizedCart

  if (anonymousCartId && anonymousCartToken && reactionCustomerToken) {
    const {
      data: {
        reconcileCarts: { cart: rawReconciledCart },
      },
    } = await config.fetch(
      reconcileCartsMutation,
      {
        variables: {
          input: {
            anonymousCartId,
            cartToken: anonymousCartToken,
            shopId: config.shopId,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${reactionCustomerToken}`,
        },
      }
    )

    normalizedCart = normalizeCart(rawReconciledCart)

    // Clear the anonymous cart cookies, as we're now using an account-tied cart
    res.setHeader('Set-Cookie', [
      getCartCookie(config.anonymousCartTokenCookie),
      getCartCookie(config.anonymousCartIdCookie),
    ])
  } else if (anonymousCartId && anonymousCartToken) {
    const {
      data: { cart: rawAnonymousCart },
    } = await config.fetch(getAnomymousCartQuery, {
      variables: {
        cartId: anonymousCartId,
        cartToken: anonymousCartToken,
      },
    })

    normalizedCart = normalizeCart(rawAnonymousCart)
  } else if (reactionCustomerToken && !anonymousCartToken && !anonymousCartId) {
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
  } else {
    // If there's no cart for now, return a dummy cart ID to keep Next Commerce happy
    res.setHeader(
      'Set-Cookie',
      getCartCookie(config.anonymousCartIdCookie, config.dummyEmptyCartId, 999)
    )
  }

  res.status(200).json({ data: normalizedCart ?? null })
}

export default getCart
