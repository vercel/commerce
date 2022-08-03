import type { CheckoutEndpoint } from '.'

const submitCheckout: CheckoutEndpoint['handlers']['submitCheckout'] = async ({
  res,
}) => {
  // Return cart and errors
  res.status(200).json({ data: null, errors: [] })
}

export default submitCheckout
