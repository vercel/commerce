import type { CheckoutEndpoint } from '.'

const submitCheckout: CheckoutEndpoint['handlers']['submitCheckout'] = async ({
  req,
  res,
  body: { cartId },
  config: { restBuyerFetch, tokenCookie },
}) => {
  // Return an error if no item is present
  if (!cartId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  // Get token from cookies
  const token = req.cookies[tokenCookie]

  // Submit order
  await restBuyerFetch(
    'POST',
    `/orders/Outgoing/${cartId}/submit`,
    {},
    { token }
  )

  // Return cart and errors
  res.status(200).json({ data: null, errors: [] })
}

export default submitCheckout
