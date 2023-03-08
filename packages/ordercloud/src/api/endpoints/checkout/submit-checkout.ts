import type { CheckoutEndpoint } from '.'

const submitCheckout: CheckoutEndpoint['handlers']['submitCheckout'] = async ({
  req,
  body: { cartId },
  config: { restBuyerFetch, tokenCookie },
}) => {
  const token = req.cookies.get(tokenCookie)?.value

  // Submit order
  await restBuyerFetch('POST', `/orders/Outgoing/${cartId}/submit`, null, {
    token,
  })

  // Return cart and errors
  return { data: null }
}

export default submitCheckout
