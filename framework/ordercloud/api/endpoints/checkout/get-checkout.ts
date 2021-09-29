import type { CheckoutEndpoint } from '.'

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  res,
  body: { cartId },
  config: { restFetch },
}) => {
  // Return an error if no item is present
  if (!cartId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing cookie' }],
    })
  }

  try {
    // Register credit card
    const payments = await restFetch(
      'GET',
      `/orders/Outgoing/${cartId}/payments`
    ).then((response: { Items: unknown[] }) => response.Items)

    const address = await restFetch('GET', `/orders/Outgoing/${cartId}`).then(
      (response: { ShippingAddressID: string }) => response.ShippingAddressID
    )

    // Return cart and errors
    res.status(200).json({
      data: {
        hasPayment: payments.length > 0,
        hasShipping: Boolean(address),
      },
      errors: [],
    })
  } catch (error: any) {
    console.log(error, error.toString(), JSON.stringify(error))

    // Return cart and errors
    res.status(500).json({
      data: null,
      errors: [
        {
          message: error.message,
          code: error.statusCode || error.code || error.status,
        },
      ],
    })
  }
}

export default getCheckout
