import Stripe from 'stripe'

import type { CardFields } from '../../../types/customer/card'
import { LineItem } from '../../../types/cart'
import placeOrder from '../../mutations/place-order'
import setEmailOnAnonymousCart from '../../mutations/set-email-on-anonymous-cart'
import getCartCookie from '../../utils/get-cart-cookie'
import type { CheckoutEndpoint } from '.'

const stripe = new Stripe(process.env.OPENCOMMERCE_STRIPE_API_KEY as string, {
  apiVersion: '2020-08-27',
})

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

  const card = item.card as CardFields

  const pm = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: card.cardNumber,
      exp_month: Number(card.cardExpireDate.split('/')[0]),
      exp_year: Number(card.cardExpireDate.split('/')[1]),
      cvc: card.cardCvc,
    },
  } as Stripe.PaymentMethodCreateParams)

  const result = await stripe.paymentIntents.create({
    confirm: true,
    amount: Math.round(item.checkout.cart.checkout.summary.total.amount * 100),
    currency: item.checkout.cart.currency.code,
    capture_method: 'manual',
    metadata: {
      integration_check: 'accept_a_payment',
    },
    payment_method: pm.id,
  })

  if (result.status === 'succeeded' || result.status === 'requires_capture') {
    const { data } = await fetch(placeOrder, {
      variables: {
        input: {
          payments: {
            data: { stripePaymentIntentId: result.id },
            amount: item.checkout.cart.checkout.summary.total.amount,
            method: 'stripe_payment_intent',
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
  }
  res.status(200).json({ data: null, errors: [] })
}

export default submitCheckout
