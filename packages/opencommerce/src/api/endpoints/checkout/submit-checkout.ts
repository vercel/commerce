import { LineItem } from '../../../types/cart'
import placeOrder from '../../mutations/place-order'
import setEmailOnAnonymousCart from '../../mutations/set-email-on-anonymous-cart'
import getAnonymousCartQuery from '../../queries/get-anonymous-cart'
import getCartCookie from '../../utils/get-cart-cookie'
import type { CheckoutEndpoint } from '.'
import { normalizeCheckout, normalizeCart } from '../../../utils/normalize'
import { PrimaryShopQuery } from '../../../../schema'
import getPrimaryShopQuery from '../../queries/get-primary-shop-query'

const submitCheckout: CheckoutEndpoint['handlers']['submitCheckout'] = async ({
  body: { cartId },
  config: { fetch, anonymousCartTokenCookie, cartCookie },
  req: { cookies },
}) => {
  const {
    data: { primaryShop },
  } = await fetch<PrimaryShopQuery>(getPrimaryShopQuery)

  if (!primaryShop?._id) {
    return {
      data: null,
    }
  }

  await fetch(setEmailOnAnonymousCart, {
    variables: {
      input: {
        cartId,
        cartToken: cookies.get(anonymousCartTokenCookie)?.value,
        email: 'opencommerce@test.com',
      },
    },
  })

  const {
    data: { cart: rawAnonymousCart },
  } = await fetch(getAnonymousCartQuery, {
    variables: {
      cartId,
      cartToken: cookies.get(anonymousCartTokenCookie)?.value,
    },
  })

  const checkout = normalizeCheckout(rawAnonymousCart.checkout)
  const cart = normalizeCart(rawAnonymousCart)

  const { data } = await fetch(placeOrder, {
    variables: {
      input: {
        payments: {
          data: { fullName: 'Open Commerce Demo Site' },
          amount: checkout.summary.total.amount,
          method: 'iou_example',
        },
        order: {
          cartId,
          currencyCode: cart.currency.code,
          email: 'opencommerce@test.com',
          shopId: primaryShop._id,
          fulfillmentGroups: {
            shopId: primaryShop._id,
            data: checkout.fulfillmentGroups[0].data,
            items: cart.lineItems.map((item: LineItem) => ({
              price: item.variant.price,
              quantity: item.quantity,
              productConfiguration: {
                productId: item.productId,
                productVariantId: item.variantId,
              },
            })),
            type: checkout.fulfillmentGroups[0].type,
            selectedFulfillmentMethodId:
              checkout.fulfillmentGroups[0].selectedFulfillmentOption
                ?.fulfillmentMethod?._id,
          },
        },
      },
    },
  })

  return {
    data: null,
    errors: [],
    headers: {
      'Set-Cookie': [
        getCartCookie(cartCookie),
        getCartCookie(anonymousCartTokenCookie),
      ],
    },
  }
}

export default submitCheckout
