import type { CustomerCardEndpoint } from '.'
import createPaymentIntent from '../../../mutations/create-payment-intent'

const addItem: CustomerCardEndpoint['handlers']['addItem'] = async ({
  res,
  body: { item, cartId },
  config,
  req: { cookies },
}) => {
  // Return an error if no item is present
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  // Return an error if no cart is present
  if (!cartId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Cookie not found' }],
    })
  }

  const {
    data: { createStripePaymentIntent },
  } = await config.fetch(createPaymentIntent, {
    variables: {
      input: {
        cartId,
        shopId: config.shopId,
        cartToken: cookies[config.anonymousCartTokenCookie],
      },
    },
  })

  return res.status(200).json({
    data: createStripePaymentIntent.paymentIntentClientSecret,
  })
}

export default addItem
