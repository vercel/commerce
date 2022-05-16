import { LineItem } from '../../../types/cart'
import placeOrder from '../../mutations/place-order'
import setEmailOnAnonymousCart from '../../mutations/set-email-on-anonymous-cart'
import getCartCookie from '../../utils/get-cart-cookie'
import type { CheckoutEndpoint } from '.'

const submitCheckout: CheckoutEndpoint['handlers']['submitCheckout'] = async ({
  res,
  body: { item, cartId },
  config: { fetch, shopId, anonymousCartTokenCookie, cartCookie },
  req: { cookies },
}) => {
  await fetch(setEmailOnAnonymousCart, {
    variables: {
      input: {
        cartId,
        cartToken: cookies[anonymousCartTokenCookie],
        email: 'opencommerce@test.com',
      },
    },
  })

  const { data } = await fetch(placeOrder, {
    variables: {
      input: {
        payments: {
          data: { fullName: 'Open Commerce Demo Site' },
          amount: item.checkout.cart.checkout.summary.total.amount,
          method: 'iou_example',
        },
        order: {
          cartId,
          currencyCode: item.checkout.cart.currency.code,
          email: 'opencommerce@test.com',
          shopId,
          fulfillmentGroups: {
            shopId,
            data: item.checkout.cart.checkout.fulfillmentGroups[0].data,
            items: item.checkout.cart.lineItems.map((item: LineItem) => ({
              price: item.variant.price,
              quantity: item.quantity,
              productConfiguration: {
                productId: item.productId,
                productVariantId: item.variantId,
              },
            })),
            type: item.checkout.cart.checkout.fulfillmentGroups[0].type,
            selectedFulfillmentMethodId:
              item.checkout.cart.checkout.fulfillmentGroups[0]
                .selectedFulfillmentOption.fulfillmentMethod._id,
          },
        },
      },
    },
  })

  res.setHeader('Set-Cookie', [
    getCartCookie(cartCookie),
    getCartCookie(anonymousCartTokenCookie),
  ])

  res.status(200).json({ data: null, errors: [] })
}

export default submitCheckout
