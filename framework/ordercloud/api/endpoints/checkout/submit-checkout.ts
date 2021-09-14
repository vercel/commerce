import type { CheckoutEndpoint } from '.'

const submitCheckout: CheckoutEndpoint['handlers']['submitCheckout'] = async ({
  res,
  body: { cartId },
  config: { restFetch },
}) => {
  // Return an error if no item is present
  if (!cartId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  // Submit order
  await restFetch('POST', `/orders/Outgoing/${cartId}/submit`, {})

  // Return cart and errors
  res.status(200).json({ data: null, errors: [] })
}

export default submitCheckout
